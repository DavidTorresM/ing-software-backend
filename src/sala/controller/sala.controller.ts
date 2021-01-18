import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
  } from '@nestjs/common';
  
  import { JwtAuthGuardAdministrador } from '../../auth/guards/jwt-aut.administrador.guard';
  import { JwtAuthGuardDocente } from '../../auth/guards/jwt-aut.docente.guard';
  import { JwtAuthGuardAlumno } from '../../auth/guards/jwt-auth.alumno.guard';
  
  import { Sala } from '../sala.entity';
  import { SalaDTO } from '../interface/sala.interface';
  import { SalaService } from '../service/sala.service';
  
  @Controller('api/sala')
  export class SalaController {
    constructor(
      private servicioSala: SalaService,
     ) {}
	  @UseGuards(JwtAuthGuardAdministrador)  
    @Post('crear')
    async crearSala(@Body() salaDTO: SalaDTO): Promise< Sala > {
      const respuesta = await this.servicioSala.crear(salaDTO);
      
      return respuesta;
    }
	  @UseGuards(JwtAuthGuardAlumno)  
    @Get('buscar/:id')
    async obtenerSala(@Param('id') id: number): Promise< Sala | null >{
      const respuesta = await this.servicioSala.obtenerSala(id);
  
      return respuesta;
    }
    @UseGuards(JwtAuthGuardAlumno) 
    @Get('listar')
    async obtenerSalas() : Promise< Sala[] > {
      const respuesta = await this.servicioSala.obtenerSalas();
  
      return respuesta;
    }

  }
  