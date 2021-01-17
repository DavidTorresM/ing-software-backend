import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
  import { from, Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
import { MensajeDTO } from 'src/mensaje/interface/mensaje.interface';
import { MensajeModule } from 'src/mensaje/mensaje.module';
  
/*
import { JwtService } from '../auth/jwt/jwt.service';
import { User } from '../users/interfaces/user.interface';
import { RoomsService } from '../rooms/rooms.service';


*/
//import { Server } from 'socket.io';
import { Socket, Server } from 'socket.io';

import { MensajeService } from '../mensaje/service/mensaje.service';

@WebSocketGateway(8080,{ transports:['websocket'] })
export class ChatGateway implements OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;
  connectedUsers: string[] = [];

  constructor(
    private mensajeService: MensajeService,
      /*
    private jwtService: JwtService,
    private roomService: RoomsService,*/
  ) {}
  afterInit(){
    console.log("[*] Inicializado el chat");
  }
  handleDisconnect(){
    console.log("[*] Desconectando servidor");
  }
  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: { sender: string, room: string, message: string }) {
    this.server.to(message.room).emit('chatToClient', message);
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string ) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string ) {
    client.leave(room);
    client.emit('leftRoom', room);
  }

}
