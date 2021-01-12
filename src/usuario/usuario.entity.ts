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
  
  @Column({ nullable: false })
  contrasenia: string;

  @Column({ nullable: false })  
  nombre: string;

  @Column({ nullable: false })
  primerApellido: string;

  @Column({ nullable: false })
  segundoApellido: string;

  @Column({ nullable: false })
  idDireccion: number;

  @ManyToOne(() => Direccion, { nullable: false } )
  @JoinColumn([{ name: 'idDireccion', referencedColumnName: 'id' }])
  direccion: Direccion;

  public getFormatResponse(): Usuario {
    const response = {...this};

    delete response['idDireccion'];
    delete response['contrasenia'];

    response.direccion = response.direccion.getResponseFormat();

    return response;
  } 
}
