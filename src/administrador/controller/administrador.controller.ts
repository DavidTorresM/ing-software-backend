import {
    Body,
    Controller,
    Get,
    Param,
    Post,
  } from '@nestjs/common'
  
  import { Administrador } from '../administrador.entity';
  import { AdministradorDTO } from '../interface/administrador.interface';
  import { AdministradorService } from '../service/administrador.service';
  
@Controller('api/administrador')
export class AdministradorController {
    constructor(private servicioAdministrador: AdministradorService){}
    @Post('crear')
    async crearAdministrador(@Body() administradorDTO: AdministradorDTO): Promise< Administrador > {
      const respuesta = await this.servicioAdministrador.crear(administradorDTO);
      
      return respuesta;
    }
    
    @Get('buscar/:id')
    async obtenerAdministrador(@Param('id') id: string): Promise< Administrador | null >{
      const respuesta = await this.servicioAdministrador.obtenerAdministrador(id);
      
      return respuesta;
    }
  
    @Get('listar')
    async obtenerAdministradores() : Promise< Administrador[] > {
      const respuesta = await this.servicioAdministrador.obtenerAdministradores();
      return respuesta;
    }
}
