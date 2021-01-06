import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm';

import { Estado } from '../estado.entity';
import { EstadoDTO } from '../interface/estado.interface';

@Injectable()
export class EstadoService {
  constructor(
    @InjectRepository(Estado) private repositorioEstado: Repository< Estado >
  ) {}

  async crear(estado: EstadoDTO): Promise< Estado > {
    const nuevoEstado = this.repositorioEstado.create(estado);

    return this.repositorioEstado.save(nuevoEstado);
  }

  async obtenerEstado(id: number): Promise< Estado | null > {
    const estado = await this.repositorioEstado.findOne({
      id,
    });

    return estado;
  }

  async obtenerEstados(): Promise< Estado[] > {
    const estados = this.repositorioEstado.find();

    return estados;
  }
}
