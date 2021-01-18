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

import { Publicacion } from '../publicacion.entity';
import { PublicacionDTO } from '../interface/publicacion.interface';
import { PublicacionService } from '../service/publicacion.service';

@Controller('api/publicacion')
export class PublicacionController {
	constructor(
		private servicioPublicacion: PublicacionService,
	){}
	@UseGuards(JwtAuthGuardDocente)  
	@Post('crear')
	async crearPublicacion(@Body() publicacion: PublicacionDTO): Promise< Publicacion >{
		const respuesta = await this.servicioPublicacion.crear(publicacion);
		
		return respuesta;
	}
	@UseGuards(JwtAuthGuardAlumno)  
	@Get('buscar/id/:id')
	async buscarPublicacion(@Param('id') id:number): Promise< Publicacion | null >{
		const publicacion = await this.servicioPublicacion.obtenerPublicacion(id);

		return publicacion;
	}

	@UseGuards(JwtAuthGuardAlumno)  
	@Get('listar')
	async obtenerPublicaciones(): Promise< Publicacion[] >{
		const publicaciones = await this.servicioPublicacion.obtenerPublicaciones();

		return publicaciones;
	}
}
