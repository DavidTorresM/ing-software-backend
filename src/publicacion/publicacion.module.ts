import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Publicacion } from './publicacion.entity';
import { PublicacionService } from './service/publicacion.service';
import { PublicacionController } from './controller/publicacion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publicacion]),
  ],
  providers: [PublicacionService],
  controllers: [PublicacionController]
})
export class PublicacionModule {}
