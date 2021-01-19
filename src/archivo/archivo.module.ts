import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { Archivo } from './archivo.entity';
import { ArchivoService } from './service/archivo.service';
import { ArchivoController } from './controller/archivo.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Archivo]),
  ],
  providers: [ArchivoService],
  controllers: [ArchivoController],
  exports:[ ArchivoService ]
})
export class ArchivoModule {}
