import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeleteResult, Repository } from 'typeorm';

import { Mensaje } from '../mensaje.entity';
import { MensajeDTO } from '../interface/mensaje.interface';

const relacionesMensaje: string[] = [
  'autor'
];

@Injectable()
export class MensajeService {
  constructor(
    @InjectRepository(Mensaje) private repositorioMensaje: Repository< Mensaje >
  ) {}

  async crear(mensaje: MensajeDTO): Promise< Mensaje > {
    const nuevaMensaje = this.repositorioMensaje.create(mensaje);

    return this.repositorioMensaje.save(nuevaMensaje);
  }

  async obtenerMensajePorSala(id: number): Promise< Mensaje[] | null > {
    const mensaje = await this.repositorioMensaje.find({ where:{idSala:id},relations: relacionesMensaje });

    return mensaje;
  }

  async eliminarMensajePorId(id: number): Promise< Mensaje|null > {
    const mensaje = await this.repositorioMensaje.findOne({ id });

    if(mensaje){
      await this.repositorioMensaje.delete(id);
    }
    return mensaje;
  }

  async obtenerMensajes(): Promise< Mensaje[] > {
    const mensajees = this.repositorioMensaje.find({relations:relacionesMensaje});
    
    return mensajees;
  }

}
