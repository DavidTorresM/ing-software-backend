import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
  } from '@nestjs/common'
  
  import { JwtAuthGuardAdministrador } from '../../auth/guards/jwt-aut.administrador.guard';

  import { Administrador } from '../administrador.entity';
  import { AdministradorDTO } from '../interface/administrador.interface';
  import { AdministradorService } from '../service/administrador.service';
  
@Controller('api/administrador')
export class AdministradorController {
    constructor(private servicioAdministrador: AdministradorService){}
    
    @UseGuards(JwtAuthGuardAdministrador)
    @Post('crear')
    async crearAdministrador(@Body() administradorDTO: AdministradorDTO): Promise< Administrador > {
      const respuesta = await this.servicioAdministrador.crear(administradorDTO);
      
      return respuesta;
    }
    
    @UseGuards(JwtAuthGuardAdministrador)
    @Get('buscar/:id')
    async obtenerAdministrador(@Param('id') id: string): Promise< Administrador | null >{
      const respuesta = await this.servicioAdministrador.obtenerAdministrador(id);
      
      return respuesta;
    }
  
    @UseGuards(JwtAuthGuardAdministrador)
    @Get('listar')
    async obtenerAdministradores() : Promise< Administrador[] > {
      const respuesta = await this.servicioAdministrador.obtenerAdministradores();
      return respuesta;
    }
}
