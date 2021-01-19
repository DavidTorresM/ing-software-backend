import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WsException,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { MensajeDTO } from 'src/mensaje/interface/mensaje.interface';
import { Socket, Server } from 'socket.io';
import { MensajeService } from '../mensaje/service/mensaje.service';
import { SalaService } from '../sala/service/sala.service';
import { SalaDTO } from 'src/sala/interface/sala.interface';
import { JwtAuthGuardAlumno } from '../auth/guards/jwt-auth.alumno.guard';


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
  @UseGuards(JwtAuthGuardAlumno)
  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: MensajeDTO
    //{ sender: string, room: string, message: string }
    ) {
    this.mensajeService.crear(message);
    console.log("chatToServer:\n",message);
    this.server.to(message.idCurso).emit('chatToClient', message);
  }

  //NOTA Recibe el idCurso
  //salida el json de la sala a unirte
  @UseGuards(JwtAuthGuardAlumno)
  @SubscribeMessage('joinRoom')
  async handleRoomJoin(client: Socket, room ) {
    //verificando si al sala existe 
    const sala =await this.salaService.obtenerSalaPorCampo("idCurso",room.idCurso);
    if(!sala){
      console.log("[info] La NO sala existe =)");
      throw new WsException('Invalid Room.');
    }
    console.log("[info] La sala existe =)");
    console.log("handleRoomJoin:\n",room);
    client.join(room);
    client.emit('joinedRoom', sala);
  }
  @UseGuards(JwtAuthGuardAlumno)
  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: SalaDTO ) {
    console.log("handleRoomLeave:\n",room);
    client.leave(room.idCurso);
    client.emit('leftRoom', room);
  }

}
