import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm'

import { Materia } from '../materia.entity';
import { MateriaDTO } from '../interface/materia.interface';

@Injectable()
export class MateriaService {
    constructor(
      @InjectRepository(Materia) private repositorioMateria: Repository< Materia >
    ) {}
    async obtenerMaterias(): Promise< Materia[] >{
        const materias = await this.repositorioMateria.find();
        return materias;
    }
    async obtenerMateria(id: number): Promise <Materia | null> {
        const materia = await this.repositorioMateria.findOne({
            id,
        });
        return materia;
    }
    async crear(materia: MateriaDTO): Promise< Materia >{
        const nuevoMateria = this.repositorioMateria.create(materia);
        return this.repositorioMateria.save(nuevoMateria);
    }
}
