import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Usuario } from './usuario.entity';
import { UsuarioService } from './service/usuario.service';
import { UsuarioController } from './controller/usuario.controller';
import { SalaModule } from 'src/sala/sala.module';
import { AlumnoModule } from 'src/alumno/alumno.module';
import { DocenteModule } from 'src/docente/docente.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    SalaModule,
    AlumnoModule,
    DocenteModule,
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController],  
  exports: [UsuarioService]
})
export class UsuarioModule {}
