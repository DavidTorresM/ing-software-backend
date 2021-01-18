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

import { Direccion } from '../direccion.entity';
import { DireccionDTO } from '../interface/direccion.interface';
import { DireccionService } from '../service/direccion.service';

@Controller('api/direccion')
export class DireccionController {
  constructor(
    private servicioDireccion: DireccionService,
   ) {}
  @UseGuards(JwtAuthGuardAdministrador)  
  @Post('crear')
  async crearDireccion(@Body() direccionDTO: DireccionDTO): Promise< Direccion > {
    const respuesta = await this.servicioDireccion.crear(direccionDTO);
    
    return respuesta;
  }
  @UseGuards(JwtAuthGuardAdministrador)  
  @Get('buscar/:id')
  async obtenerDireccion(@Param('id') id: number): Promise< Direccion | null >{
    const respuesta = await this.servicioDireccion.obtenerDireccion(id);

    return respuesta;
  }
}
