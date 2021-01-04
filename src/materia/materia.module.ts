import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { Materia } from './materia.entity';
import { MateriaService } from './service/materia.service';
import { MateriaController } from './controller/materia.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Materia]),
  ],
  providers: [MateriaService],
  controllers: [MateriaController]
})
export class MateriaModule {}
