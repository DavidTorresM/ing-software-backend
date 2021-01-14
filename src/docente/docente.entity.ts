import {
  Entity,
  JoinColumn,
  PrimaryColumn,
  OneToOne,
} from 'typeorm';

import { Usuario } from '../usuario/usuario.entity';

@Entity()
export class Docente {
  @PrimaryColumn()
  idUsuario: string;

  @OneToOne(() => Usuario)
  @JoinColumn([{
    name: 'idUsuario',
    referencedColumnName: 'id'
  }])
  usuario: Usuario;


  public getFormatResponse(): Docente {
    const response = {...this};
    response.usuario = response.usuario.getFormatResponse();
    delete response.usuario["id"];
    return response;
  }


}
