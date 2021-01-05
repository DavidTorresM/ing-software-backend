import {
  Entity,
  JoinColumn,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import { Curso } from '../curso/curso.entity';
import { SituacionAcademica } from '../situacion-academica/situacion-academica.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario: Usuario;

  @ManyToOne(() => SituacionAcademica)
  @JoinColumn([{
    name: 'idSituacionAcademica',
    referencedColumnName: 'id',
  }])
  situacionAcademica: SituacionAcademica;


  @ManyToMany(() => Curso)
  @JoinTable({
    name: 'AlumnoCursa',
  })
  cursos: Curso[];
}
