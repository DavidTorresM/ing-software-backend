interface ArchivoDTO {
	nombre: string;
	tamanio: number;
	tipo: string;
	url: string;
};

export interface PublicacionDTO{
	titulo: string;
	descripcion: string;
	fechaPublicacion: Date;
	idSala: number;
	archivo: ArchivoDTO;
}
