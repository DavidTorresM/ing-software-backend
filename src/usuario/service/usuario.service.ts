import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm'

import { encryptText } from '../../utils/string.util';
import { Usuario } from '../usuario.entity';
import { UsuarioDTO } from '../interface/usuario.interface';

const relacionesUsuario: string[] = [
  'direccion',
  'direccion.colonia',
  'direccion.delegacion',
  'direccion.estado',
];

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private repositorioUsuario: Repository< Usuario >
  ) {}

  async crear(usuario: UsuarioDTO): Promise< Usuario > {
    usuario.contrasenia = encryptText(usuario.contrasenia);

    const nuevoUsuario = this.repositorioUsuario.create(usuario);

    return this.repositorioUsuario.save(nuevoUsuario);
  }

  async obtenerUsuarioPorCampo(nombre: string, valor: string): Promise< Usuario | null> {
    const campos = {
      [nombre]: valor,
    };
   
    const usuario = await this.repositorioUsuario.findOne(
      campos,
      { relations: relacionesUsuario }
    );

    if (!usuario) {
      return null;
    }

    return usuario.getFormatResponse();
  }

  async obtenerUsuarioPorId(id: string): Promise< Usuario | null > {
    return this.obtenerUsuarioPorCampo('id', id);
  }

  async obtenerUsuarioPorEmail(email: string): Promise< Usuario | null > {
    return this.obtenerUsuarioPorCampo('email', email);
  }
}
