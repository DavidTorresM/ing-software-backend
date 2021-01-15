
import {
  Column, 
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
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
  curso: Curso;

  @OneToMany(() => Mensaje, mensaje => mensaje.sala)
  mensajes: Mensaje[];

  public getFormatResponse(): Sala {
    const response = {...this};
    


    delete response['idCurso'];
    response.curso && (response.curso = response.curso.getFormatResponse());
    
    return response;
  }

}
