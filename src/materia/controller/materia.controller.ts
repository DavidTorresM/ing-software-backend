import {
    Body,
    Controller,
    Get,
    Param,
    Post,
  } from '@nestjs/common';
  
  import { Materia } from '../materia.entity';
  import { MateriaDTO } from '../interface/materia.interface';
  import { MateriaService } from '../service/materia.service';
  
@Controller('api/materia')
export class MateriaController {
    constructor(private servicioMateria:MateriaService)
    {}
    @Post("crear")
    async crearMateria(@Body() materiaDTO:MateriaDTO): Promise< Materia >{
        const respuesta = await this.servicioMateria.crear(materiaDTO);
        return respuesta;
    }
    @Get("buscar/:id")
    async obtenerMateria(@Param('id') id: number): Promise< Materia | null >{
        const respuesta = await this.servicioMateria.obtenerMateria(id);
        return respuesta;
    }
    
    @Get("listar")
    async obtenerMaterias() : Promise< Materia[] >{
        const respuesta = await this.servicioMateria.obtenerMaterias();
        return respuesta;
    }
}
