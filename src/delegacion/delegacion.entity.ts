import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Delegacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  nombre: string;
}
