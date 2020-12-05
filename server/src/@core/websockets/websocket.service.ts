import {OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WebsocketService implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer()
  server: Server;
  
  async emitMessage(name, payload): Promise<void> {
    await this.server.emit(name, payload);
  }
  
  async handleConnection() {
    // Do smth...
  }
  
  async handleDisconnect() {
    // Do smth...
  }
  
}
