import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm'

import { Curso } from '../curso.entity';
import { CursoDTO } from '../interface/curso.interface';
const relacionesCurso: string[] = [
    'materia',
    'docente',
  ];
  
@Injectable()
export class CursoService {
    constructor(
      @InjectRepository(Curso) private repositorioCurso: Repository< Curso >
    ) {}
    async obtenerCursos(): Promise< Curso[] >{
        const cursos = await this.repositorioCurso.find({ relations:relacionesCurso });
        return cursos;
    }
    async obtenerCurso(id: string): Promise <Curso | null> {
        const curso = await this.repositorioCurso.findOne({
            id,
        },{ relations:relacionesCurso });
        
        if (!curso)
            return null;

        return curso;
    }
    async crear(curso: CursoDTO): Promise< Curso >{
        const nuevoCurso = this.repositorioCurso.create(curso);
        console.log(nuevoCurso);
        console.log(curso);
        return this.repositorioCurso.save(nuevoCurso);
    }
}
