import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { Mensaje } from './mensaje.entity';
import { MensajeService } from './service/mensaje.service';
import { MensajeController } from './controller/mensaje.controller';
import { MensajeDTO } from './interface/mensaje.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mensaje]),
  ],
  providers: [MensajeService],
  controllers: [MensajeController],
  exports:[MensajeService],
})
export class MensajeModule {}
