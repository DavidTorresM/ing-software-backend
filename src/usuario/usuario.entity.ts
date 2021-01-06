import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Direccion } from '../direccion/direccion.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  email: string;
  
  @Column()
  contrasenia: string;

  @Column()
  nombre: string;

  @Column()
  primerApellido: string;

  @Column()
  segundoApellido: string;

  @Column()
  idDireccion: number;

  @ManyToOne(() => Direccion, { nullable: false } )
  @JoinColumn([{ name: 'idDireccion', referencedColumnName: 'id' }])
  direccion: Direccion;

  public getFormatResponse(): Usuario {
    const response = {...this};

    delete response['idDireccion'];
    delete response['contrasenia'];

    return response;
  } 
}
