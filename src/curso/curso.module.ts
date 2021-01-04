import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { Curso } from './curso.entity';
import { CursoService } from './service/curso.service';
import { CursoController } from './controller/curso.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Curso]),
  ],
  providers: [CursoService],
  controllers: [CursoController]
})
export class CursoModule {}
