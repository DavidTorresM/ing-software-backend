import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Colonia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  nombre: string;
}
