import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Archivo {
  @PrimaryColumn()
  url: string;

  @Column()
  nombre: string;

  @Column('double precision')
  tamanio: number;

  @Column()
  tipo: string;
}
