import { Controller, Post, Request, Response } from '@nestjs/common';

import { ArchivoService } from '../service/archivo.service';

@Controller('api/archivo')
export class ArchivoController {
  constructor(private servicioArchivo: ArchivoService) {}

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
