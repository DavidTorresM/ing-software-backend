import {
    Body,
    Controller,
    Get,
    Param,
    Post,
  } from '@nestjs/common';
  
  import { Sala } from '../sala.entity';
  import { SalaDTO } from '../interface/sala.interface';
  import { SalaService } from '../service/sala.service';
  
  @Controller('api/sala')
  export class SalaController {
    constructor(
      private servicioSala: SalaService,
     ) {}
  
    @Post('crear')
    async crearSala(@Body() salaDTO: SalaDTO): Promise< Sala > {
      const respuesta = await this.servicioSala.crear(salaDTO);
      
      return respuesta;
    }
    
    @Get('buscar/:id')
    async obtenerSala(@Param('id') id: number): Promise< Sala | null >{
      const respuesta = await this.servicioSala.obtenerSala(id);
  
      return respuesta;
    }
  }
  