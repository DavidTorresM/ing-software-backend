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
      
      delete respuesta.usuario.id;
      delete respuesta.usuario.idDireccion;
      delete respuesta.usuario.direccion.id;
      delete respuesta.usuario.direccion.idColonia;
      delete respuesta.usuario.direccion.idDelegacion;
      delete respuesta.usuario.direccion.idEstado;

      return respuesta;
    }
  
    @Get('listar')
    async obtenerDocentees() : Promise< Docente[] > {
      const respuesta = await this.servicioDocente.obtenerDocentees();
      respuesta.map(admin => {
        delete admin.usuario.id;
        delete admin.usuario.idDireccion;
        delete admin.usuario.direccion.id;
        delete admin.usuario.direccion.idColonia;
        delete admin.usuario.direccion.idDelegacion;
        delete admin.usuario.direccion.idEstado;
      });
      return respuesta;
    }
}
