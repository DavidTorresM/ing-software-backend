import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common';

import { JwtAuthGuardDocente } from '../../auth/guards/jwt-aut.docente.guard';
import { JwtAuthGuardAlumno } from '../../auth/guards/jwt-auth.alumno.guard';

import { Publicacion } from '../publicacion.entity';
import { PublicacionDTO } from '../interface/publicacion.interface';
import { PublicacionService } from '../service/publicacion.service';
import { ArchivoService } from '../../archivo/service/archivo.service';

@Controller('api/publicacion')
export class PublicacionController {
	constructor(
		private servicioPublicacion: PublicacionService,
		private servicioArchivo: ArchivoService,
	){}
	//curl 'http://localhost:3000/api/publicacion/crear' -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:84.0) Gecko/20100101 Firefox/84.0' -H 'Accept: application/json, text/plain, */*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Content-Type: application/json;charset=utf-8' -H 'Origin: http://localhost:3001' -H 'Connection: keep-alive' -H 'Referer: http://localhost:3001/' --data-raw $'{"idSala":"3","titulo":"Publicaicon nueva ","descripcion":"jkslafddjska\xf1fjksdl","fechaPublicacion":"2021-01-19T02:18:58.523Z","archivo":{"nombre":"cal-Escolarizada-20-21.pdf","tamanio":1296956,"tipo":"application/pdf","url":"https://archivos-polimeet.s3.us-east-2.amazonaws.com/1611022730930%20-%20cal-Escolarizada-20-21.pdf"}}'
	@UseGuards(JwtAuthGuardDocente)  
	@Post('crear')
	async crearPublicacion(@Body() publicacion: PublicacionDTO): Promise< Publicacion|null >{
		let publicacionNueva: Publicacion;
		if(publicacion.archivo && Object.keys(publicacion.archivo).length > 0 ){//con archivo
			console.log("con archivo");
			//Primero creamos en archivo
			let archivo = await this.servicioArchivo.crear(publicacion.archivo);
			console.log("Archivo creado", archivo);

			publicacion["archivoUrl"] = archivo.url;
			//borramos el archivo
			delete publicacion.archivo;
		}else{//sin archivo
			console.log("sin archivo");
			(publicacion.archivo)?delete publicacion.archivo:null;
		}
		publicacionNueva = await this.servicioPublicacion.crear(publicacion);
		console.log("Publicacion nueva", publicacionNueva);

		return publicacionNueva;
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

	@Get('buscar/sala/:id')
	async buscarPublicacionSala(@Param('id') id:number): Promise< Publicacion[] | null >{
		const publicacion = await this.servicioPublicacion.obtenerPublicacionPorCampo("idSala",""+id);

		return publicacion;
	}

	

}
