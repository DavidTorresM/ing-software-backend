import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm';

import { SituacionAcademica } from '../situacion-academica.entity';
import { SituacionAcademicaDTO } from '../interface/situacion-academica.interface';

@Injectable()
export class SituacionAcademicaService {
  constructor(
    @InjectRepository(SituacionAcademica) private repositorioSituacionAcademica: Repository< SituacionAcademica >
  ) {}

  async crear(situacionAcademica: SituacionAcademicaDTO): Promise< SituacionAcademica > {
    const nuevaSituacionAcademica = this.repositorioSituacionAcademica.create(situacionAcademica);

    return this.repositorioSituacionAcademica.save(nuevaSituacionAcademica);
  }

  async obtenerSituacionAcademica(id: number): Promise< SituacionAcademica | null > {
    const situacionAcademica = await this.repositorioSituacionAcademica.findOne({
      id,
    });

    return situacionAcademica;
  }
}
