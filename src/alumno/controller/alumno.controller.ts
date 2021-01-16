import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';

import { Alumno } from '../alumno.entity';
import { AlumnoDTO } from '../interface/alumno.interface';
import { AlumnoService } from '../service/alumno.service';

import { JwtAuthGuardAdministrador } from '../../auth/guards/jwt-aut.administrador.guard';
import { JwtAuthGuardDocente } from '../../auth/guards/jwt-aut.docente.guard';
import { JwtAuthGuardAlumno } from '../../auth/guards/jwt-auth.alumno.guard';


@Controller('api/alumno')
export class AlumnoController {
  constructor(
    private servicioAlumno: AlumnoService,
   ) {}
  @UseGuards(JwtAuthGuardAdministrador)
  @Post('crear')
  async crearAlumno(@Body() alumnoDTO: AlumnoDTO): Promise< Alumno > {
    const respuesta = await this.servicioAlumno.crear(alumnoDTO);
    
    return respuesta;
  }
  
  @UseGuards(JwtAuthGuardAlumno)
  @Get('buscar/id/:id')
  async obtenerAlumnoPorId(@Param('id') id: string): Promise< Alumno | null >{
    const respuesta = await this.servicioAlumno.obtenerAlumnoPorId(id);

    return respuesta;
  }
}
