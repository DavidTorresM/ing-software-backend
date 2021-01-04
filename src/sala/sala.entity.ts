import {
  Entity,
  JoinColumn,
  PrimaryColumn,
  OneToOne,
} from 'typeorm';

import { Curso } from '../curso/curso.entity';

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
}
