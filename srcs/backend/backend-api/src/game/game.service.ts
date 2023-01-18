import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { clearInterval } from 'timers';
import { GameInfo } from './utils/gameinfo';

class user{
  id : string;
  piclink : string;
  side : string;
}

@Injectable()
export class GameService {
  constructor() {}
  handleConnection(client: Socket, players: Socket[], wss: Server, rooms: string[], ongameclients:Socket[]): void 
  {
    client.data.gameIntervalIdState = "off";
    // Check client's token and get client Id, profile pic link and level=============================================
    /*
      need to fill these :{
        client.data.user.id
        client.data.user.piclink
      }
    */
    client.data.user = new user();
    client.data.user.id = client.id;
    client.data.user.piclink = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg";
    if (client.handshake.query.role == "player")
      this.handlePlayerConnection(client, players, wss, rooms, ongameclients);
    else if (client.handshake.query.role == "spectator")
      this.handleSpectatorConnection(client, rooms, ongameclients);
  }

  //  Spectator mode
  async handleSpectatorConnection(client: Socket, rooms: string[], ongameclients:Socket[])
  {
    if (client.connected) // Proceed if the client hasn't disconnected
    {
        let id:string[];
        const found = rooms.find(room => 
          {
            id = room.split("+");
            if (id[0] == client.handshake.query.userId || id[1] == client.handshake.query.userId)
              return 1;
            return 0;
          });
        if (!found)
          client.emit("game has ended");
        // Send players info to spectator
        let player = ongameclients.find((cl)=>{cl.data.user.id == id[0]});
        client.emit("playerInfo", player.data.user);
        player = ongameclients.find((cl)=>{cl.data.user.id == id[1]});
        client.emit("playerInfo", player.data.user);
        // Join client to room
        client.join(found);
    }
  }

  // Function handles when player is connected to the firstGateway
  async handlePlayerConnection (client: Socket, players: Socket[], wss: Server, rooms: string[], ongameclients:Socket[])
  {
    if (client.connected) // Proceed if the client hasn't disconnected
    {
      // If no one is waiting, add client to queue
      if (players.length == 0)
      {
        players.push(client);
        client.emit("queue");
        client.data.user.side = 'left';
        client.emit("playerInfo", client.data.user);
      }
      else // If someone already in queue join him in a game with client
      {
        client.data.user.side = 'right';
        client.emit("playerInfo", client.data.user);
        const second = client;
        const first = players.pop();
        ongameclients.push(first, second);
        // Join them
        this.joinPlayersToGame(first, second, wss, rooms, ongameclients);
      }
    }
}
  

  joinPlayersToGame(first: Socket, second: Socket, wss: Server, rooms: string[], ongameclients:Socket[])
  {
    const roomname = first.data.user.id + '+' + second.data.user.id;

    // Join players to room
    first.join(roomname);
    second.join(roomname);
    first.data.roomname = roomname;
    second.data.roomname = roomname;
    rooms.push(roomname);
    // Set up opponent for both players
    first.data.opponent = second;
    second.data.opponent = first;

    // Create a GameInfo for players
    const gameinfo = new GameInfo();
    first.data.gameinfo = gameinfo;
    second.data.gameinfo = gameinfo;
  
    // Set Key events for both clients
    first.on("keyUp", () => {gameinfo.updatePaddles("left", "up");});
    first.on("keyDown", () => {gameinfo.updatePaddles("left", "down");});
    second.on("keyUp", () => {gameinfo.updatePaddles("right", "up");});
    second.on("keyDown", () => {gameinfo.updatePaddles("right", "down");});

    // Set both clients state in database to playing ===============================
    /*
        first.data.user.id && second.data.user.id
    */
    // Send opponent info
    first.emit("playerInfo", second.data.user);
    second.emit("playerInfo", first.data.user);

    // Starting game
    const intervalId = setInterval(() => {
      if (gameinfo.update() == false) 
      {
        // Broadcast new cooridnates to players in room
        wss
          .to(roomname)
          .emit('update', gameinfo.coordinates());
      } 
      else 
      {
        if (gameinfo.winner() == "left")
        {
          first.emit("uWon", "left");
          second.emit("uLost", "right");
        }
        else
        {
          first.emit("uLost", "left");
          second.emit("uWon", "right");
        }
        this.gameFinished(first, second, wss, rooms, ongameclients);
      }
    }, 1000/60);
    first.data.gameIntervalId = intervalId;
    second.data.gameIntervalId = intervalId;
    first.data.gameIntervalIdState = "on";
    second.data.gameIntervalIdState= "on";
  }

  async gameFinished(first: Socket, second: Socket, wss: Server, rooms: string[], ongameclients:Socket[])
  {
    clearInterval(first.data.gameIntervalId);
    first.data.gameIntervalIdState = "off";
    second.data.gameIntervalIdState = "off";
    first.disconnect();
    second.disconnect();
    ongameclients.filter((client)=>{client == first});
    ongameclients.filter((client)=>{client == second});

    // Setting result for both users
    if (first.data.gameinfo.leftPaddleScore == first.data.gameinfo.winScore)
    {
      first.data.result = "win";
      second.data.result = "loss";
      wss.to(first.data.roomname).emit("Winner", "left");
    }
    else
    {
      first.data.result = "loss";
      second.data.result = "win";
      wss.to(first.data.roomname).emit("Winner", "right");
    }
    wss.in(first.data.gameIntervalIdState).disconnectSockets(true);
    rooms.filter(room => first.data.roomname == room);
    // Add game to users history and their state to not playing============================================
          /*
              user 1:{
                id : first.data.user.id
                opponent : second.data.user.id
                result : first.data.result
                score : first.data.gameinfo.leftPaddleScore
              }
              user 2:{
                id : second.data.user.id
                opponent : first.data.user.id
                result : second.data.result
                score : second.data.gameinfo.rightPaddleScore
              }
              set state to not playing
          */
  }

  async handleDisconnection(wss: Server, client: Socket, queue: Socket[], rooms: string[], ongameclients:Socket[])
  {
    // If client has a player role
    if (client.handshake.query.role == "player")
    {
      // Filter queue from client
      queue.filter(clientInQueue => clientInQueue == client);
      // If client is already in game
      if (client.data.gameIntervalIdState == "on")
      {
          clearInterval(client.data.gameIntervalId);
          client.data.opponent.data.gameIntervalIdState = "off";
          client.data.opponent.emit("OpponentLeft");
          client.data.opponent.disconnect();

          ongameclients.filter((cl)=>{cl == client});
          ongameclients.filter((cl)=>{client == client.data.opponent});
        
          // For spectators
          if (client.data.user.side == "left")
            wss.to(client.data.roomname).emit("Winner", "right");
          else
            wss.to(client.data.roomname).emit("Winner", "left");
          wss.in(client.data.gameIntervalIdState).disconnectSockets(true);
          rooms.filter(room => client.data.roomname == room);

          //Add game to clients history in database and set their states to not playing ===========================================
          /*
              user 1:{
                id : client.data.user.id
                opponent : client.data.opponent.data.user.id
                result : loss by leaving game
                score : 0
              }
              user 2:{
                id : client.data.opponent.data.user.id
                opponent : client.data.user.id
                result : win opponent left
                score : 5
              }
              set state to not playing
          */
      }
    }
  }


}