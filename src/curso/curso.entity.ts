import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Docente } from '../docente/docente.entity';
import { Materia } from '../materia/materia.entity';

@Entity()
export class Curso {
  @PrimaryColumn()
  id: string;

  @Column('timestamp with time zone')
  horaInicio: Date;

  @Column('timestamp with time zone')
  horaFin: Date;

  @Column()
  idMateria: number;

  @Column()
  idDocente: string;

  @ManyToOne(() => Materia)
  @JoinColumn([{
    name: 'idMateria',
    referencedColumnName: 'id',
  }])
  materia: Materia;

  @ManyToOne(() => Docente)
  @JoinColumn([{
    name: 'idDocente',
    referencedColumnName: 'idUsuario',
  }])
  docente: Docente;

  public getFormatResponse(): Curso {
    const response = {...this}; 
    
    delete response["idMateria"];
    delete response["idDocente"];
    delete response.docente.usuario.contrasenia;
    delete response.docente.usuario.direccion;
    delete response.docente.usuario.idDireccion;
    delete response.docente.usuario.id;


    return response;
  }


}
