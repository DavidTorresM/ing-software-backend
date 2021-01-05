import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  OneToOne,
} from 'typeorm';

import { Curso } from '../curso/curso.entity';
import { Mensaje } from '../mensaje/mensaje.entity';

@Entity()
export class Sala {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Curso)
  @JoinColumn([{
    name: 'idCurso',
    referencedColumnName: 'id',
  }])
  Curso: Curso;

  @ManyToOne(() => Mensaje, mensaje => mensaje.sala)
  mensajes: Mensaje[];
}
