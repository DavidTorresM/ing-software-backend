import {
    Body,
    Controller,
    Get,
    Param,
    Post,
  } from '@nestjs/common';
  
  import { Curso } from '../curso.entity';
  import { CursoDTO } from '../interface/curso.interface';
  import { CursoService } from '../service/curso.service';
  
@Controller('api/curso')
export class CursoController {
    constructor(private servicioCurso:CursoService)
    {}
    @Post("crear")
    async crearCurso(@Body() cursoDTO:CursoDTO): Promise< Curso >{
        const respuesta = await this.servicioCurso.crear(cursoDTO);
        return respuesta;
    }
    @Get("buscar/:id")
    async obtenerCurso(@Param('id') id: string): Promise< Curso | null >{
        const respuesta = await this.servicioCurso.obtenerCurso(id);
        return respuesta;
    }
    @Get("listar")
    async obtenerCursos() : Promise< Curso[] >{
        const respuesta = await this.servicioCurso.obtenerCursos();
        return respuesta;
    }
}
