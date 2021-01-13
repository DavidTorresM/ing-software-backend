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
}
