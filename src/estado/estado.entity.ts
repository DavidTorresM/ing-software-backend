import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique("nombreEstado", ["nombre"])
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
