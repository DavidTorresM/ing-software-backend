import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique("nombreDelegacion", ["nombre"])
export class Delegacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
