import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { Docente } from './docente.entity';
import { DocenteService } from './service/docente.service';
import { DocenteController } from './controller/docente.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Docente]),
  ]
  providers: [DocenteService],
  controllers: [DocenteController]
})
export class DocenteModule {}
