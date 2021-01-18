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

  import { Curso } from '../curso.entity';
  import { CursoDTO } from '../interface/curso.interface';
  import { CursoService } from '../service/curso.service';
  
@Controller('api/curso')
export class CursoController {
    constructor(private servicioCurso:CursoService)
    {}
    @UseGuards(JwtAuthGuardAdministrador)
    @Post("crear")
    async crearCurso(@Body() cursoDTO:CursoDTO): Promise< Curso >{
        const respuesta = await this.servicioCurso.crear(cursoDTO);
        console.log(cursoDTO);
        console.log(respuesta);
        return respuesta;
    }
    @UseGuards(JwtAuthGuardAlumno)
    @Get("buscar/:id")
    async obtenerCurso(@Param('id') id: string): Promise< Curso | null >{
        const respuesta = await this.servicioCurso.obtenerCurso(id);
        return respuesta;
    }
    @UseGuards(JwtAuthGuardAlumno)
    @Get("listar")
    async obtenerCursos() : Promise< Curso[] >{
        const respuesta = await this.servicioCurso.obtenerCursos();
        return respuesta;
    }
}
