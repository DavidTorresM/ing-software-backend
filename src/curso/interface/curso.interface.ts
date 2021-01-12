import { Materia } from 'src/materia/materia.entity';
import { Docente } from 'src/docente/docente.entity';

export interface CursoDTO {
    idMateria: number;
    idDocente: string;
    horaInicio: Date;
    horaFin: Date;
}