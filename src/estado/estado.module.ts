import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Estado } from './estado.entity';
import { EstadoService } from './service/estado.service';
import { EstadoController } from './controller/estado.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estado]),
  ],
  providers: [EstadoService],
  controllers: [EstadoController]
})
export class EstadoModule {}
