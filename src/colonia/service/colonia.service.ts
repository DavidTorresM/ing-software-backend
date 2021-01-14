import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm'

import { Colonia } from '../colonia.entity';
import { ColoniaDTO } from '../interface/colonia.interface';

@Injectable()
export class ColoniaService {
  constructor(
    @InjectRepository(Colonia) private repositorioColonia: Repository< Colonia >
  ) {}

  async crear(colonia: ColoniaDTO): Promise< Colonia > {
    const nuevaColonia = this.repositorioColonia.create(colonia);

    return this.repositorioColonia.save(nuevaColonia);
  }

  async obtenerColonia(id: number): Promise< Colonia | null > {
    const colonia = await this.repositorioColonia.findOne({
      id,
    });

    return colonia;
  }

  async obtenerColonias(): Promise< Colonia[] > {
    const colonias = await this.repositorioColonia.find();

    return colonias;
  }
}
