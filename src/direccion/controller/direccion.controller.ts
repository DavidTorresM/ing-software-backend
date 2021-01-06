import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { Direccion } from '../direccion.entity';
import { DireccionDTO } from '../interface/direccion.interface';
import { DireccionService } from '../service/direccion.service';
@Controller('api/direccion')
export class DireccionController {
  constructor(
    private servicioDireccion: DireccionService,
   ) {}

  @Post('crear')
  async crearDireccion(@Body() direccionDTO: DireccionDTO): Promise< Direccion > {
    const respuesta = await this.servicioDireccion.crear(direccionDTO);
    
    return respuesta;
  }
  
   @Get('buscar/:id')
  async obtenerDireccion(@Param('id') id: number): Promise< Direccion | null >{
    const respuesta = await this.servicioDireccion.obtenerDireccion(id);

    return respuesta;
  }
/*
  @Get('listar')
  async obtenerDirecciones() : Promise< Colonia[] > {
    const respuesta = await this.servicioColonia.obtenerColonias();

    return respuesta;
  } */
}
