import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  
  import { JwtAuthGuardAdministrador } from '../../auth/guards/jwt-aut.administrador.guard';
  import { JwtAuthGuardDocente } from '../../auth/guards/jwt-aut.docente.guard';
  import { JwtAuthGuardAlumno } from '../../auth/guards/jwt-auth.alumno.guard';
  
  import { Mensaje } from '../mensaje.entity';
  import { MensajeDTO } from '../interface/mensaje.interface';
  import { MensajeService } from '../service/mensaje.service';
  
  @Controller('api/mensaje')
  export class MensajeController {
    constructor(
      private servicioMensaje: MensajeService,
     ) {}
    //@UseGuards(JwtAuthGuardAlumno)  
    @Post('crear')
    async crearMensaje(@Body() mensajeDTO: MensajeDTO): Promise< Mensaje > {
      const respuesta = await this.servicioMensaje.crear(mensajeDTO);
      
      return respuesta;
    }
    @UseGuards(JwtAuthGuardAlumno)  
    @Get('listar/:id')
    async obtenerMensaje(@Param('id') id: number): Promise< Mensaje[] | null >{
      const respuesta = await this.servicioMensaje.obtenerMensajePorSala(id);
  
      return respuesta;
    }
    @UseGuards(JwtAuthGuardAlumno)  
    @Delete('eliminar/:id')
    async eliminarMensaje(@Param('id') id: number): Promise< Mensaje | null >{
      const respuesta = await this.servicioMensaje.eliminarMensajePorId(id);
  
      return respuesta;
    }
    @UseGuards(JwtAuthGuardAlumno)  
    @Get('listar')
    async obtenerMensajees() : Promise< Mensaje[] > {
      const respuesta = await this.servicioMensaje.obtenerMensajes();
  
      return respuesta;
    }
  }
  