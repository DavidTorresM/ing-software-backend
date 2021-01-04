import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { Alumno } from './alumno.entity';
import { AlumnoService } from './service/alumno.service';
import { AlumnoController } from './controller/alumno.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alumno]),
  ],
  providers: [AlumnoService],
  controllers: [AlumnoController]
})
export class AlumnoModule {}
