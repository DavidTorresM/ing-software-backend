import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Direccion } from './direccion.entity';
import { DireccionService } from './service/direccion.service';
import { DireccionController } from './controller/direccion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Direccion]),
  ],
  providers: [DireccionService],
  controllers: [DireccionController]
})
export class DireccionModule {}
