import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm'

import { Sala } from '../sala.entity';
import { SalaDTO } from '../interface/sala.interface';


@Injectable()
export class SalaService {
  constructor(
    @InjectRepository(Sala) private repositorioSala: Repository< Sala >
  ) {}

  async crear(sala: SalaDTO): Promise< Sala > {
    const nuevaSala = this.repositorioSala.create(sala);

    return this.repositorioSala.save(nuevaSala);
  }

  async obtenerSala(id: number): Promise< Sala | null > {
    const sala = await this.repositorioSala.findOne(
      { id },
      { relations: ['colonia', 'delegacion', 'estado'], }
    );

    if (!sala) {
      return null;
    }

    return sala;
  }
}
