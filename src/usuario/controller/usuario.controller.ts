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

@Controller('api/usuario')
export class UsuarioController {
  constructor(
    private servicioUsuario: UsuarioService,
   ) {}

  @Post('crear')
  async crearUsuario(@Body() usuarioDTO: UsuarioDTO): Promise< Usuario > {
    const respuesta = await this.servicioUsuario.crear(usuarioDTO);
    
    return respuesta;
  }
  
  @Get('buscar/id/:id')
  async obtenerUsuarioPorId(@Param('id') id: string): Promise< Usuario | null >{
    const respuesta = await this.servicioUsuario.obtenerUsuarioPorId(id);

    return respuesta;
  }

  @Get('buscar/email/:email')
  async obtenerUsuarioPorEmail(@Param('email') email: string): Promise< Usuario | null >{
    const respuesta = await this.servicioUsuario.obtenerUsuarioPorEmail(email);

    return respuesta;
  }
}
