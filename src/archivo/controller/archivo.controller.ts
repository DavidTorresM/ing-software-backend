import { Controller, Body, Get, Post, Request, Response, UseGuards } from '@nestjs/common';

import { ArchivoService } from '../service/archivo.service';
import { Archivo } from '../archivo.entity';
import { ArchivoDTO } from '../interface/archivo.interface';

import { JwtAuthGuardAdministrador } from '../../auth/guards/jwt-aut.administrador.guard';
import { JwtAuthGuardDocente } from '../../auth/guards/jwt-aut.docente.guard';
import { JwtAuthGuardAlumno } from '../../auth/guards/jwt-auth.alumno.guard';


@Controller('api/archivo')
export class ArchivoController {
  constructor(private servicioArchivo: ArchivoService) {}


  @UseGuards(JwtAuthGuardDocente)
  @Post('crear')
  async crearArchivo(@Body() archivoDTO: ArchivoDTO) : Promise< Archivo > {
    const respuesta = await this.servicioArchivo.crear(archivoDTO);

    return respuesta;
  }


  @Post('subir')
  async upload(@Request() request, @Response() response) {
    try{
      this.servicioArchivo.subirArchivo(request, response);
    }
    catch(error) {
      return response.status(500).json(`Hubo un error al subir el archivo: ${error.message}`);
    }
  }
}
