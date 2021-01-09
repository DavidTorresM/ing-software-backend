import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SituacionAcademica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  nombre: string;
}
