import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Direccion } from '../direccion/direccion.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
  
  @Column()
  constrasenia: string;

  @Column()
  nombre: string;

  @Column()
  primerApellido: string;

  @Column()
  segundoApellido: string;
  
  @ManyToOne(() => Direccion)
  @JoinColumn([{ name: 'direccionId', referencedColumnName: 'id' }])
  direccion: Direccion;
}
