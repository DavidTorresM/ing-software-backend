import {
	Body,
	Controller,
	Get,
	Param,
	Post,
  } from '@nestjs/common';

import { Publicacion } from '../publicacion.entity';
import { PublicacionDTO } from '../interface/publicacion.interface';
import { PublicacionService } from '../service/publicacion.service';

@Controller('api/publicacion')
export class PublicacionController {
	constructor(
		private servicioPublicacion: PublicacionService,
	){}

	@Post('crear')
	async crearPublicacion(@Body() publicacion: PublicacionDTO): Promise< Publicacion >{
		const respuesta = await this.servicioPublicacion.crear(publicacion);
		
		return respuesta;
	}

	@Get('buscar/:id')
	async buscarPublicacion(@Param('id') id:number): Promise< Publicacion | null >{
		const publicacion = await this.servicioPublicacion.obtenerPublicacion(id);

		return publicacion;
	}

	@Get('listar')
	async obtenerPublicaciones(): Promise< Publicacion[] >{
		const publicaciones = await this.servicioPublicacion.obtenerPublicaciones();

		return publicaciones;
	}
}
