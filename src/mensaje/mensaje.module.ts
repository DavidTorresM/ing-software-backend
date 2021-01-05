import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { Mensaje } from './mensaje.entity';
import { MensajeService } from './service/mensaje.service';
import { MensajeController } from './controller/mensaje.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mensaje]),
  ],
  providers: [MensajeService],
  controllers: [MensajeController]
})
export class MensajeModule {}
