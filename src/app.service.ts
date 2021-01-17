import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const script = 'const socket=new WebSocket("ws://localhost:8080");socket.onopen=function(){console.log("Connected"),socket.send(JSON.stringify({event:"events",data:"test"})),socket.onmessage=function(o){console.log(o)}};';
    return "";
  }
  
}
