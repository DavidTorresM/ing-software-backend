import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Archivo } from '../archivo/archivo.entity';
import { Sala } from '../sala/sala.entity';

@Entity()
export class Publicacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;
  
  @Column()
  descripcion: string;

  @Column('timestamp with time zone')
  fechaPublicacion: Date;

  @ManyToOne(() => Sala)
  @JoinColumn([{
    name: 'idSala',
    referencedColumnName: 'id',
  }])
  sala: Sala;

  @OneToOne(() => Archivo)
  @JoinColumn()
  archivo: Archivo;
}
