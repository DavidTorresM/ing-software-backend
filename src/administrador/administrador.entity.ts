import {
  Entity,
  JoinColumn,
  PrimaryColumn,
  OneToOne,
} from 'typeorm';

import { Usuario } from '../usuario/usuario.entity';

@Entity()
export class Administrador {
  @PrimaryColumn()
  idUsuario: string;

  @OneToOne(() => Usuario)
  @JoinColumn([{
    name: 'idUsuario',
    referencedColumnName: 'id',
  }])
  usuario: Usuario;
}