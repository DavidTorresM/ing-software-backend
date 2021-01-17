import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
  import { from, Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Server } from 'ws';
  
/*
import { JwtService } from '../auth/jwt/jwt.service';
import { User } from '../users/interfaces/user.interface';
import { RoomsService } from '../rooms/rooms.service';
*/

@WebSocketGateway(4444)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server;

  connectedUsers: string[] = [];

  constructor(
      /*
    private jwtService: JwtService,
    private roomService: RoomsService,*/
  ) {}

  async handleConnection(socket) {
    /*
    const user: User = await this.jwtService.verify(
      socket.handshake.query.token,
      true
    );
    */

    this.connectedUsers = [...this.connectedUsers, String("Algun usuario")];
    console.log("Conneccion entrante");
    // Send list of connected users
    this.server.emit('users', this.connectedUsers);
  }

  async handleDisconnect(socket) {
      /*
    const user: User = await this.jwtService.verify(
      socket.handshake.query.token,
      true
    );
    */
    const userPos = this.connectedUsers.indexOf(String("Algun usuario"));

    if (userPos > -1) {
      this.connectedUsers = [
        ...this.connectedUsers.slice(0, userPos),
        ...this.connectedUsers.slice(userPos + 1)
      ];
    }

    // Sends the new list of connected users
    this.server.emit('users', this.connectedUsers);
  }

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('message')
  async onMessage(client, data: any) {
    const event: string = 'message';
    const result = data[0];

    //await this.roomService.addMessage(result.message, result.room);
    client.broadcast.to(result.room).emit(event, result.message);

    return Observable.create(observer =>
      observer.next({ event, data: result.message })
    );
  }

  @SubscribeMessage('join')
  async onRoomJoin(client, data: any): Promise<any> {
    client.join(data[0]);

    //const messages = await this.roomService.findMessages(data, 25);

    // Send last messages to the connected user
    client.emit('message', ["Mensaje","join"]);
  }

  @SubscribeMessage('leave')
  onRoomLeave(client, data: any): void {
    client.leave(data[0]);
  }
}
