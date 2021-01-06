import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique("nombreColonia", ["nombre"])
export class Colonia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
