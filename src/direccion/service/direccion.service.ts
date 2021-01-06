import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm'

import { Direccion } from '../direccion.entity';
import { DireccionDTO } from '../interface/direccion.interface';


@Injectable()
export class DireccionService {
  constructor(
    @InjectRepository(Direccion) private repositorioDireccion: Repository< Direccion >
  ) {}

  async crear(direccion: DireccionDTO): Promise< Direccion > {
    const nuevaDireccion = this.repositorioDireccion.create(direccion);

    return this.repositorioDireccion.save(nuevaDireccion);
  }

  async obtenerDireccion(id: number): Promise< Direccion | null > {
    const direccion = await this.repositorioDireccion.findOne(
      { id },
      { relations: ['colonia', 'delegacion', 'estado'], }
    );

    return direccion;
  }

/*   async obtenerColonias(): Promise< Colonia[] > {
    const colonias = this.repositorioColonia.find();

    return colonias;
  } */
}
