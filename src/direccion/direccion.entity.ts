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

  @Column()
  idColonia: number;

  @Column()
  idDelegacion: number;

  @Column()
  idEstado: number;

  @ManyToOne(() => Colonia, { nullable: false })
  @JoinColumn([{
    name: 'idColonia',
    referencedColumnName: 'id',
  }])
  colonia: Colonia;

  @ManyToOne(() => Delegacion, { nullable: false })
  @JoinColumn([{
    name: 'idDelegacion',
    referencedColumnName: 'id',
  }])
  delegacion: Delegacion;

  @ManyToOne(() => Estado, { nullable: false })
  @JoinColumn([{
    name: 'idEstado',
    referencedColumnName: 'id',
  }])
  estado: Estado;
}
