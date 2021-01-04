import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Direccion } from '../direccion/direccion.entity';

@Entity()
export class Delegacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Direccion, direccion => direccion.delegacion)
  direcciones: Direccion[];
}