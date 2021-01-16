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
  
  import { Docente } from '../docente.entity';
  import { DocenteDTO } from '../interface/docente.interface';
  import { DocenteService } from '../service/docente.service';
  
@Controller('api/docente')
export class DocenteController {
    constructor(private servicioDocente: DocenteService){}
    @UseGuards(JwtAuthGuardAdministrador)  
    @Post('crear')
    async crearDocente(@Body() docenteDTO: DocenteDTO): Promise< Docente > {
      const respuesta = await this.servicioDocente.crear(docenteDTO);
      
      return respuesta;
    }
    @UseGuards(JwtAuthGuardAlumno)  
    @Get('buscar/:id')
    async obtenerDocente(@Param('id') id: string): Promise< Docente | null >{
      const respuesta = await this.servicioDocente.obtenerDocente(id);
      if(!respuesta)
        return null;
      return respuesta.getFormatResponse();
    }
    @UseGuards(JwtAuthGuardAlumno)  
    @Get('listar')
    async obtenerDocentees() : Promise< Docente[] > {
      const respuesta = await this.servicioDocente.obtenerDocentees();
      
      return respuesta.map(admin => admin.getFormatResponse());;
    }
}
