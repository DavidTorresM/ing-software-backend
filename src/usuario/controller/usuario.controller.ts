import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuardAdministrador } from '../../auth/guards/jwt-aut.administrador.guard';
import { JwtAuthGuardDocente } from '../../auth/guards/jwt-aut.docente.guard';
import { JwtAuthGuardAlumno } from '../../auth/guards/jwt-auth.alumno.guard';

import { Usuario } from '../usuario.entity';
import { UsuarioDTO } from '../interface/usuario.interface';
import { UsuarioService } from '../service/usuario.service';
import { Sala } from 'src/sala/sala.entity';

@Controller('api/usuario')
export class UsuarioController {
  constructor(
    private servicioUsuario: UsuarioService,
   ) {}
  @UseGuards(JwtAuthGuardAdministrador)
  @Post('crear')
  async crearUsuario(@Body() usuarioDTO: UsuarioDTO): Promise< Usuario > {
    const respuesta = await this.servicioUsuario.crear(usuarioDTO);
    
    return respuesta;
  }
  @UseGuards(JwtAuthGuardAlumno)
  @Get('buscar/id/:id')
  async obtenerUsuarioPorId(@Param('id') id: string): Promise< Usuario | null >{
    const respuesta = await this.servicioUsuario.obtenerUsuarioPorId(id);

    return respuesta;
  }
  @UseGuards(JwtAuthGuardAlumno)
  @Get('buscar/email/:email')
  async obtenerUsuarioPorEmail(@Param('email') email: string): Promise< Usuario | null >{
    const respuesta = await this.servicioUsuario.obtenerUsuarioPorEmail(email);

    return respuesta;
  }

  @Get('buscar/salas/:id')
  async obtenerSalasPorId(@Param('id') id: string): Promise< Sala[] | null >{
    const respuesta = await this.servicioUsuario.obtenerSalas(id);

    return respuesta;
  }
}
