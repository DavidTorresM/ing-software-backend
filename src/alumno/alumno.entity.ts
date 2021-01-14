import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  PrimaryColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import { Curso } from '../curso/curso.entity';
import { SituacionAcademica } from '../situacion-academica/situacion-academica.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity()
export class Alumno {
  @PrimaryColumn()
  @Index({ unique: true })
  idUsuario: string;

  @Column({ nullable: false })
  idSituacionAcademica: number;

  @OneToOne(() => Usuario, { nullable: false })
  @JoinColumn([{
    name: 'idUsuario',
    referencedColumnName: 'id',
  }])
  usuario: Usuario;

  @ManyToOne(() => SituacionAcademica,{ nullable: false })
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

  public getFormatResponse(): Alumno {
    const response = {...this};

    delete response['idUsuario'];
    delete response['idSituacionAcademica'];

    response.usuario = response.usuario.getFormatResponse();

    return response;
  }
}
