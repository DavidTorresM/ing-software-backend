import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Delegacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
