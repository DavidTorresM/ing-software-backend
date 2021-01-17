import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WsException,
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
import { SalaService } from '../sala/service/sala.service';
import { Sala } from '../sala/sala.entity';
import { Mensaje } from 'src/mensaje/mensaje.entity';
import { throws } from 'assert';



@WebSocketGateway(8080,{ transports:['websocket'] })
export class ChatGateway implements OnGatewayConnection,OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;
  connectedUsers: string[] = [];

  constructor(
    private mensajeService: MensajeService,
    private salaService: SalaService,
      /*
    private jwtService: JwtService,
    private roomService: RoomsService,*/
  ) {}
  afterInit(){
    console.log("[*] Inicializado el chat");
  }
  handleConnection(){
    console.log("[*]Conexion entrante");
  }
  handleDisconnect(){
    console.log("[*] Desconectando servidor");
  }
  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: MensajeDTO
    //{ sender: string, room: string, message: string }
    ) {
    this.mensajeService.crear(message);
    console.log("chatToServer:\n",message);
    this.server.to(message.idCurso).emit('chatToClient', message);
  }

  //NOTA Recibe id curso
  //salida el json de la sala a unirte
  @SubscribeMessage('joinRoom')
  async handleRoomJoin(client: Socket, room: string ) {
    //verificando si al sala existe 
    const sala =await this.salaService.obtenerSalaPorCampo("idCurso",room);
    if(!sala){
      console.log("[info] La NO sala existe =)");
      throw new WsException('Invalid Room.');
    }
    console.log("[info] La sala existe =)");
    console.log("handleRoomJoin:\n",room);
    client.join(room);
    client.emit('joinedRoom', sala);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string ) {
    console.log("handleRoomLeave:\n",room);
    client.leave(room);
    client.emit('leftRoom', room);
  }

}
