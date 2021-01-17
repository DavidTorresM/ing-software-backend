import { Module } from '@nestjs/common';

// Modules
/*
import { RoomsModule } from '../rooms/rooms.module';
import { AuthModule } from '../auth/auth.module';
*/
import { MensajeModule } from '../mensaje/mensaje.module';
import { SalaModule } from '../sala/sala.module';

// Components
import { ChatGateway } from './chat.gateway';

/*
import { ChatGateway } from './chat.gateway';
import { JwtService } from '../auth/jwt/jwt.service';
import { RoomsService } from '../rooms/rooms.service';
*/

@Module({
  imports: [
    MensajeModule,
    SalaModule,
    
  ],
  providers: [ChatGateway],
})
export class ChatModule {}