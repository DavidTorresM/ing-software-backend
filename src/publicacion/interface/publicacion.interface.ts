export interface PublicacionDTO{
	titulo: string;
	descripcion: string;
	fechaPublicacion: Date;
	idSala: number;
	archivoUrl?: string;
}