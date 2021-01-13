import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { Alumno } from '../alumno.entity';
import { AlumnoDTO } from '../interface/alumno.interface';
import { AlumnoService } from '../service/alumno.service';

@Controller('api/alumno')
export class AlumnoController {
  constructor(
    private servicioAlumno: AlumnoService,
   ) {}

  @Post('crear')
  async crearAlumno(@Body() alumnoDTO: AlumnoDTO): Promise< Alumno > {
    const respuesta = await this.servicioAlumno.crear(alumnoDTO);
    
    return respuesta;
  }
  
  @Get('buscar/id/:id')
  async obtenerAlumnoPorId(@Param('id') id: string): Promise< Alumno | null >{
    const respuesta = await this.servicioAlumno.obtenerAlumnoPorId(id);

    return respuesta;
  }
}
