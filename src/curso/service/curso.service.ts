import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm'

import { Curso } from '../curso.entity';
import { CursoDTO } from '../interface/curso.interface';

@Injectable()
export class CursoService {
    constructor(
      @InjectRepository(Curso) private repositorioCurso: Repository< Curso >
    ) {}
    async obtenerCursos(): Promise< Curso[] >{
        const cursos = await this.repositorioCurso.find();
        return cursos;
    }
    async obtenerCurso(id: string): Promise <Curso | null> {
        const curso = await this.repositorioCurso.findOne({
            id,
        });
        return curso;
    }
    async crear(curso: CursoDTO): Promise< Curso >{
        const nuevoCurso = this.repositorioCurso.create(curso);
        return this.repositorioCurso.save(nuevoCurso);
    }
}
