import {
  Entity,
  JoinColumn,
  PrimaryColumn,
  OneToOne,
} from 'typeorm';

import { Usuario } from '../usuario/usuario.entity';

@Entity()
export class Administrador {
  @PrimaryColumn()
  idUsuario: string;

  @OneToOne(() => Usuario)
  @JoinColumn([{
    name: 'idUsuario',
    referencedColumnName: 'id',
  }])
  usuario: Usuario;

  getFormatResponse(): Administrador {
    const response = {...this};

    response.usuario = response.usuario.getFormatResponse();
    delete response.usuario["id"];
    return response;
  }


}