import {
  Entity,
  JoinColumn,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToOne,
} from 'typeorm';

import { Curso } from '../curso/curso.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario: Usuario;

  @ManyToMany(() => Curso)
  @JoinTable({
    name: 'AlumnoCursa',
  })
  cursos: Curso[];
}
