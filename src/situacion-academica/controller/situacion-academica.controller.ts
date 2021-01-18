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

import { SituacionAcademica } from '../situacion-academica.entity';
import { SituacionAcademicaDTO } from '../interface/situacion-academica.interface';
import { SituacionAcademicaService } from '../service/situacion-academica.service';

@Controller('api/situacionAcademica')
export class SituacionAcademicaController {
  constructor(
    private servicioSituacionAcademica: SituacionAcademicaService
   ) {}
  @UseGuards(JwtAuthGuardAdministrador) 
  @Post('crear')
  async crearSituacionAcademica(@Body() situacionAcademicaDTO: SituacionAcademicaDTO): Promise< SituacionAcademica > {
    const respuesta = await this.servicioSituacionAcademica.crear(situacionAcademicaDTO);
    
    return respuesta;
  }
  @UseGuards(JwtAuthGuardAlumno)
  @Get('buscar/:id')
  async obtenerSituacionAcademica(@Param('id') id: number): Promise< SituacionAcademica | null >{
    const respuesta = await this.servicioSituacionAcademica.obtenerSituacionAcademica(id);

    return respuesta;
  }
}
