import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { Docente } from './docente.entity';
import { DocenteService } from './service/docente.service';
import { DocenteController } from './controller/docente.controller';
import { CursoModule } from 'src/curso/curso.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Docente]),
    CursoModule,
  ],
  providers: [DocenteService],
  controllers: [DocenteController],
  exports:[DocenteService]
})
export class DocenteModule {}
