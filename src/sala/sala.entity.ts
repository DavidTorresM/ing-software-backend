import {
  Column, 
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import { Curso } from '../curso/curso.entity';
import { Mensaje } from '../mensaje/mensaje.entity';

@Entity()
export class Sala {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idCurso: string;

  @OneToOne(() => Curso)
  @JoinColumn([{
    name: 'idCurso',
    referencedColumnName: 'id',
  }])
  Curso: Curso;

  @ManyToOne(() => Mensaje, mensaje => mensaje.sala)
  mensajes: Mensaje[];


  public getFormatResponse(): Mensaje|null {
    return null;
  } 
}
