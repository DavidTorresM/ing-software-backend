import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm';

import { Delegacion } from '../delegacion.entity';
import { DelegacionDTO } from '../interface/delegacion.interface';

@Injectable()
export class DelegacionService {
  constructor(
    @InjectRepository(Delegacion) private repositorioDelegacion: Repository< Delegacion >
  ) {}

  async crear(delegacion: DelegacionDTO): Promise< Delegacion > {
    const nuevaDelegacion = this.repositorioDelegacion.create(delegacion);

    return this.repositorioDelegacion.save(nuevaDelegacion);
  }

  async obtenerDelegacion(id: number): Promise< Delegacion | null > {
    const delegacion = await this.repositorioDelegacion.findOne({
      id,
    });

    return delegacion;
  }

  async obtenerDelegaciones(): Promise< Delegacion[] > {
    const delegaciones = this.repositorioDelegacion.find();

    return delegaciones;
  }
}
