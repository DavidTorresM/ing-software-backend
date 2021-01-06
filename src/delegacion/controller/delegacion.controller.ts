import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common'

import { Delegacion } from '../delegacion.entity';
import { DelegacionDTO } from '../interface/delegacion.interface';
import { DelegacionService } from '../service/delegacion.service';

@Controller('api/delegacion')
export class DelegacionController {
  constructor(
    private servicioDelegacion: DelegacionService,
   ) {}

  @Post('crear')
  async crearDelegacion(@Body() delegacionDTO: DelegacionDTO): Promise< Delegacion > {
    const respuesta = await this.servicioDelegacion.crear(delegacionDTO);
    
    return respuesta;
  }
  
  @Get('buscar/:id')
  async obtenerDelegacion(@Param('id') id: number): Promise< Delegacion | null >{
    const respuesta = await this.servicioDelegacion.obtenerDelegacion(id);

    return respuesta;
  }

  @Get('listar')
  async obtenerDelegaciones() : Promise< Delegacion[] > {
    const respuesta = await this.servicioDelegacion.obtenerDelegaciones();

    return respuesta;
  }
}
