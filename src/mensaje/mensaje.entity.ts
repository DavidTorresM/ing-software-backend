import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Sala } from '../sala/sala.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity()
export class Mensaje {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp with time zone')
  fechaEnviado: Date;
  
  @Column()
  texto: string;

  @Column()
  idSala:number;

  @Column()
  idAutor:string;

  
  @ManyToOne(() => Sala, sala => sala.mensajes)
  @JoinColumn([{
    name: 'idSala',
    referencedColumnName: 'id'
  }])
  sala: Sala;

  @ManyToOne(() => Usuario)
  @JoinColumn([{
    name: 'idAutor',
    referencedColumnName: 'id',
  }])
  autor: Usuario;
  


}
