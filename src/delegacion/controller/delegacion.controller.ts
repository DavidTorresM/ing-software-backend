import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { JwtAuthGuardAdministrador } from '../../auth/guards/jwt-aut.administrador.guard';
import { JwtAuthGuardDocente } from '../../auth/guards/jwt-aut.docente.guard';
import { JwtAuthGuardAlumno } from '../../auth/guards/jwt-auth.alumno.guard';

import { Delegacion } from '../delegacion.entity';
import { DelegacionDTO } from '../interface/delegacion.interface';
import { DelegacionService } from '../service/delegacion.service';

@Controller('api/delegacion')
export class DelegacionController {
  constructor(
    private servicioDelegacion: DelegacionService,
   ) {}
  @UseGuards(JwtAuthGuardAdministrador)
  @Post('crear')
  async crearDelegacion(@Body() delegacionDTO: DelegacionDTO): Promise< Delegacion > {
    const respuesta = await this.servicioDelegacion.crear(delegacionDTO);
    
    return respuesta;
  }
  @UseGuards(JwtAuthGuardAdministrador)  
  @Get('buscar/:id')
  async obtenerDelegacion(@Param('id') id: number): Promise< Delegacion | null >{
    const respuesta = await this.servicioDelegacion.obtenerDelegacion(id);

    return respuesta;
  }
  @UseGuards(JwtAuthGuardAdministrador)  
  @Get('listar')
  async obtenerDelegaciones() : Promise< Delegacion[] > {
    const respuesta = await this.servicioDelegacion.obtenerDelegaciones();

    return respuesta;
  }
}
