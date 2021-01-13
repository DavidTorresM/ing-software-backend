import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm';

import { Publicacion } from '../publicacion.entity';
import { PublicacionDTO } from '../interface/publicacion.interface';

@Injectable()
export class PublicacionService {
	constructor(
		@InjectRepository(Publicacion) private repositorioPublicacion: Repository< Publicacion >
	){}

	async crear(publicacion: PublicacionDTO):Promise< Publicacion >{
		const nuevaPublicacion = this.repositorioPublicacion.create(publicacion);
		console.log(nuevaPublicacion);
		return this.repositorioPublicacion.save(nuevaPublicacion);
	}

	async obtenerPublicacion(id: number): Promise< Publicacion | null >{
		const publicacion = await this.repositorioPublicacion.findOne({
			id,
		});

		return publicacion;
	}
}
