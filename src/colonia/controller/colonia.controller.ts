import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { Colonia } from '../colonia.entity';
import { ColoniaDTO } from '../interface/colonia.interface';
import { ColoniaService } from '../service/colonia.service';

@Controller('api/colonia')
export class ColoniaController {
  constructor(
    private servicioColonia: ColoniaService,
   ) {}

  @Post('crear')
  async crearColonia(@Body() coloniaDTO: ColoniaDTO): Promise< Colonia > {
    const respuesta = await this.servicioColonia.crear(coloniaDTO);
    
    return respuesta;
  }
  
  @Get('buscar/:id')
  async obtenerColonia(@Param('id') id: number): Promise< Colonia | null >{
    const respuesta = await this.servicioColonia.obtenerColonia(id);

    return respuesta;
  }

  @Get('listar')
  async obtenerColonias() : Promise< Colonia[] > {
    const respuesta = await this.servicioColonia.obtenerColonias();

    return respuesta;
  }
}
