import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { SituacionAcademica } from './situacion-academica.entity';
import { SituacionAcademicaService } from './service/situacion-academica.service';
import { SituacionAcademicaController } from './controller/situacion-academica.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SituacionAcademica])],
  providers: [SituacionAcademicaService],
  controllers: [SituacionAcademicaController]
})
export class SituacionAcademicaModule {}
