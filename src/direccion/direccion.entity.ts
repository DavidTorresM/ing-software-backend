import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Colonia } from '../colonia/colonia.entity';
import { Delegacion } from '../delegacion/delegacion.entity';
import { Estado } from '../estado/estado.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity()
export class Direccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  calle: string;
  
  @Column()
  numero: number;
  
  @ManyToOne(() => Colonia, colonia => colonia.direcciones)
  colonia: Colonia;

  @ManyToOne(() => Delegacion, delegacion => delegacion.direcciones)
  delegacion: Delegacion;

  @ManyToOne(() => Estado, estado => estado.direcciones)
  estado: Estado;
  
  @OneToMany(() => Usuario, usuario => usuario.direccion)
  usuarios: Usuario[];
}