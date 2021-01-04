import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SituacionAcademica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
