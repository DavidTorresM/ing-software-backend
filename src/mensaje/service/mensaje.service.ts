import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm';

import { Mensaje } from '../mensaje.entity';
import { MensajeDTO } from '../interface/mensaje.interface';
import { Usuario } from 'src/usuario/usuario.entity';

@Injectable()
export class MensajeService {
  constructor(
    @InjectRepository(Mensaje) private repositorioMensaje: Repository< Mensaje >
  ) {}

  async crear(mensaje: MensajeDTO): Promise< Mensaje > {
    const nuevaMensaje = this.repositorioMensaje.create(mensaje);

    return this.repositorioMensaje.save(nuevaMensaje);
  }

  async obtenerMensaje(id: number): Promise< Mensaje[] | null > {
    const mensaje = await this.repositorioMensaje.find({
      relations:["usuario"],
    });
    return mensaje;
  }

  async obtenerMensajes(): Promise< Mensaje[] > {
    const mensajees = this.repositorioMensaje.find();

    return mensajees;
  }

}
