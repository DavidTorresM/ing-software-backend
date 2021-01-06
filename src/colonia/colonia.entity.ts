import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Colonia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
