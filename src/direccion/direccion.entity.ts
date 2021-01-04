import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Colonia } from '../colonia/colonia.entity';
import { Delegacion } from '../delegacion/delegacion.entity';
import { Estado } from '../estado/estado.entity';

@Entity()
export class Direccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  calle: string;
  
  @Column()
  numero: number;
  
  @ManyToOne(() => Colonia)
  @JoinColumn([{ name: 'coloniaId', referencedColumnName: 'id' }])
  colonia: Colonia;

  @ManyToOne(() => Delegacion)
  @JoinColumn([{ name: 'delgacionId', referencedColumnName: 'id' }])
  delegacion: Delegacion;

  @ManyToOne(() => Estado)
  @JoinColumn([{
    name: 'idEstado',
    referencedColumnName: 'id',
  }])
  estado: Estado;
}