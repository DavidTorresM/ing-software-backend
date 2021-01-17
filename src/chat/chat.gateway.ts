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
import { MensajeDTO } from 'src/mensaje/interface/mensaje.interface';
import { Socket, Server } from 'socket.io';
import { MensajeService } from '../mensaje/service/mensaje.service';
import { SalaService } from '../sala/service/sala.service';
import { SalaDTO } from 'src/sala/interface/sala.interface';

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
  @SubscribeMessage('chatServer')
  handleMessage(client: Socket, message: MensajeDTO
    //{ sender: string, room: string, message: string }
    ) {
    this.mensajeService.crear(message);
    console.log("chatToServer:\n",message);
    this.server.to(message.idCurso).emit('chatClient', message);
  }

  //NOTA Recibe el idCurso
  //salida el json de la sala a unirte
  @SubscribeMessage('unirseSala')
  async handleRoomJoin(client: Socket, room: SalaDTO ) {
    //verificando si al sala existe 
    const sala =await this.salaService.obtenerSalaPorCampo("idCurso",room.idCurso);
    if(!sala){
      console.log("[info] La NO sala existe =)");
      throw new WsException('Invalid Room.');
    }
    console.log("[info] La sala existe =)");
    console.log("handleRoomJoin:\n",room);
    client.join(room.idCurso);
    client.emit('unidoSala', sala);
  }

  @SubscribeMessage('abandonarSala')
  handleRoomLeave(client: Socket, room: SalaDTO ) {
    console.log("handleRoomLeave:\n",room);
    client.leave(room.idCurso);
    client.emit('abandonoSala', room);
  }

}
