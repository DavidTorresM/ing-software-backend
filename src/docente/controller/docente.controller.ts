import {
    Body,
    Controller,
    Get,
    Param,
    Post,
  } from '@nestjs/common'
  
  import { Docente } from '../docente.entity';
  import { DocenteDTO } from '../interface/docente.interface';
  import { DocenteService } from '../service/docente.service';
  
@Controller('api/docente')
export class DocenteController {
    constructor(private servicioDocente: DocenteService){}
    @Post('crear')
    async crearDocente(@Body() docenteDTO: DocenteDTO): Promise< Docente > {
      const respuesta = await this.servicioDocente.crear(docenteDTO);
      
      return respuesta;
    }
    
    @Get('buscar/:id')
    async obtenerDocente(@Param('id') id: string): Promise< Docente | null >{
      const respuesta = await this.servicioDocente.obtenerDocente(id);
      if(!respuesta)
        return null;
      return respuesta.getFormatResponse();
    }
  
    @Get('listar')
    async obtenerDocentees() : Promise< Docente[] > {
      const respuesta = await this.servicioDocente.obtenerDocentees();
      
      return respuesta.map(admin => admin.getFormatResponse());;
    }
}
