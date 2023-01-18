import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer,   OnGatewayConnection,
  OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
  
@WebSocketGateway(80, {namespace:"Default"})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private clients: Socket[] = [];
  private rooms: string[] = [];
  private ongameclients: Socket[] = [];

  constructor(private firstService: GameService) {}

  async handleConnection(client: Socket, rooms: string[]) {
    console.log(client.id);
    await this.firstService.handleConnection(client, this.clients, this.wss, this.rooms, this.ongameclients);
  }

  async handleDisconnect(client: Socket) {
    await this.firstService.handleDisconnection(this.wss, client, this.clients, this.rooms, this.ongameclients);
}
}