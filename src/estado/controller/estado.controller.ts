import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common'

import { Estado } from '../Estado.entity';
import { EstadoDTO } from '../interface/estado.interface';
import { EstadoService } from '../service/estado.service';

@Controller('api/estado')
export class EstadoController {
  constructor(
    private servicioEstado: EstadoService,
   ) {}

  @Post('crear')
  async crearEstado(@Body() estadoDTO: EstadoDTO): Promise< Estado > {
    const respuesta = await this.servicioEstado.crear(estadoDTO);
    
    return respuesta;
  }
  
  @Get('buscar/:id')
  async obtenerEstado(@Param('id') id: number): Promise< Estado | null >{
    const respuesta = await this.servicioEstado.obtenerEstado(id);

    return respuesta;
  }

  @Get('listar')
  async obtenerEstados() : Promise< Estado[] > {
    const respuesta = await this.servicioEstado.obtenerEstados();

    return respuesta;
  }
}
