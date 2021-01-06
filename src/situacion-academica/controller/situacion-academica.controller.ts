import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common'

import { SituacionAcademica } from '../situacion-academica.entity';
import { SituacionAcademicaDTO } from '../interface/situacion-academica.interface';
import { SituacionAcademicaService } from '../service/situacion-academica.service';

@Controller('api/situacionAcademica')
export class SituacionAcademicaController {
  constructor(
    private servicioSituacionAcademica: SituacionAcademicaService
   ) {}

  @Post('crear')
  async crearSituacionAcademica(@Body() situacionAcademicaDTO: SituacionAcademicaDTO): Promise< SituacionAcademica > {
    const respuesta = await this.servicioSituacionAcademica.crear(situacionAcademicaDTO);
    
    return respuesta;
  }
  
  @Get('buscar/:id')
  async obtenerSituacionAcademica(@Param('id') id: number): Promise< SituacionAcademica | null >{
    const respuesta = await this.servicioSituacionAcademica.obtenerSituacionAcademica(id);

    return respuesta;
  }
}
