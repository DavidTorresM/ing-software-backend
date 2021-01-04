import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

import { Usuario } from '../usuario/usuario.entity';

@Entity()
export class Docente {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario: Usuario;
}
