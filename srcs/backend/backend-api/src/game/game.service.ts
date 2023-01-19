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
    client.data.inGame = false;
    client.data.manageDisconnection = false;
    // Get token
    /*
    */
    // AbdeLah=============================================
    try{
       // need a function that takes token, and throw if not validated, otherwise return ({id:string,piclink:string})
    }
    catch
    {

    } 
      /* need to fill these :{
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
      client.data.manageDisconnection = true;
      // If no one is waiting, add client to queue
      if (players.length == 0)
      {
        players.push(client);
        client.emit("queue");
        client.data.user.side = 'left';
        client.emit("playerInfo", client.data.user);
      //AbdLah=============================================================
      /*
        change client.data.user.id  state to "in queue" in database
      */  
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

    // AbdeLah ===============================
    /*
      Set both clients state in database to "in game"
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
    first.data.inGame = true;
    second.data.inGame= true;
  }

  async gameFinished(first: Socket, second: Socket, wss: Server, rooms: string[], ongameclients:Socket[])
  {
    clearInterval(first.data.gameIntervalId);
    first.data.inGame = false;
    second.data.inGame = false;
  
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
    // Kick all of sockets out of the room
    wss.socketsLeave(first.data.roomname);

    rooms.filter(room => first.data.roomname == room);
    // AbdeLah ============================================
          /*    Add game to users history and their state to "online"
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
              set state to "online"
          */
  }

  async handleDisconnection(wss: Server, client: Socket, queue: Socket[], rooms: string[], ongameclients:Socket[])
  {
    // If client has a player role
    if (client.handshake.query.role == "player" && client.data.manageDisconnection == true)
    {
      // AbdLah=====================================
      /*
        set client.data.user.id to "offline" in database
      */

      // Filter queue from client
      if (client.data.inGame == false)
        queue.filter(clientInQueue => clientInQueue == client);
      // If client is already in game
      else (client.data.inGame == true)
      {
          client.data.opponent.data.inGame = false;
          clearInterval(client.data.gameIntervalId);
          
          client.data.opponent.emit("OpponentLeft");

          ongameclients.filter((cl)=>{cl == client});
          ongameclients.filter((cl)=>{client == client.data.opponent});

          // For spectators
          if (client.data.user.side == "left")
            wss.to(client.data.roomname).emit("Winner", "right");
          else
            wss.to(client.data.roomname).emit("Winner", "left");
          // Kick all of sockets out of the room
          wss.socketsLeave(client.data.roomname);
          // Remove this room
          rooms.filter(room => client.data.roomname == room);

          // AbdeLah ===========================================
          /* Add game to clients history in database
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
              set client.data.opponent.data.user.id to "online" in database
          */
      }
    }
  }


}