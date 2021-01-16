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

import { Estado } from '../estado.entity';
import { EstadoDTO } from '../interface/estado.interface';
import { EstadoService } from '../service/estado.service';

@Controller('api/estado')
export class EstadoController {
  constructor(
    private servicioEstado: EstadoService,
   ) {}
  @UseGuards(JwtAuthGuardAdministrador)  
  @Post('crear')
  async crearEstado(@Body() estadoDTO: EstadoDTO): Promise< Estado > {
    const respuesta = await this.servicioEstado.crear(estadoDTO);
    
    return respuesta;
  }
  @UseGuards(JwtAuthGuardAdministrador)  
  @Get('buscar/:id')
  async obtenerEstado(@Param('id') id: number): Promise< Estado | null >{
    const respuesta = await this.servicioEstado.obtenerEstado(id);

    return respuesta;
  }
  @UseGuards(JwtAuthGuardAdministrador)  
  @Get('listar')
  async obtenerEstados() : Promise< Estado[] > {
    const respuesta = await this.servicioEstado.obtenerEstados();

    return respuesta;
  }
}
