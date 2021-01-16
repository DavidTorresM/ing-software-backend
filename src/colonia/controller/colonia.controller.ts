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

import { Colonia } from '../colonia.entity';
import { ColoniaDTO } from '../interface/colonia.interface';
import { ColoniaService } from '../service/colonia.service';

@Controller('api/colonia')
export class ColoniaController {
  constructor(
    private servicioColonia: ColoniaService,
   ) {}
  @UseGuards(JwtAuthGuardAdministrador)
  @Post('crear')
  async crearColonia(@Body() coloniaDTO: ColoniaDTO): Promise< Colonia > {
    const respuesta = await this.servicioColonia.crear(coloniaDTO);
    
    return respuesta;
  }
  @UseGuards(JwtAuthGuardAdministrador)
  @Get('buscar/:id')
  async obtenerColonia(@Param('id') id: number): Promise< Colonia | null >{
    const respuesta = await this.servicioColonia.obtenerColonia(id);

    return respuesta;
  }
  @UseGuards(JwtAuthGuardAdministrador)
  @Get('listar')
  async obtenerColonias() : Promise< Colonia[] > {
    const respuesta = await this.servicioColonia.obtenerColonias();

    return respuesta;
  }
}
