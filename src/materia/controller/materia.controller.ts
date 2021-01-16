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
 
  import { Materia } from '../materia.entity';
  import { MateriaDTO } from '../interface/materia.interface';
  import { MateriaService } from '../service/materia.service';
  
@Controller('api/materia')
export class MateriaController {
    constructor(private servicioMateria:MateriaService)
    {}
    @UseGuards(JwtAuthGuardAdministrador)  
    @Post("crear")
    async crearMateria(@Body() materiaDTO:MateriaDTO): Promise< Materia >{
        const respuesta = await this.servicioMateria.crear(materiaDTO);
        return respuesta;
    }
    @UseGuards(JwtAuthGuardAlumno)  
    @Get("buscar/:id")
    async obtenerMateria(@Param('id') id: number): Promise< Materia | null >{
        const respuesta = await this.servicioMateria.obtenerMateria(id);
        return respuesta;
    }
    @UseGuards(JwtAuthGuardAlumno)  
    @Get("listar")
    async obtenerMaterias() : Promise< Materia[] >{
        const respuesta = await this.servicioMateria.obtenerMaterias();
        return respuesta;
    }
}
