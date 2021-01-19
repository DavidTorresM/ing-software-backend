import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Docente } from '../docente.entity';
import { DocenteDTO } from '../interface/docente.interface';
import { CursoService } from 'src/curso/service/curso.service';

const relacionesDocente: string[] = [
    'usuario',
    'usuario.direccion',
    'usuario.direccion.colonia',
    'usuario.direccion.delegacion',
    'usuario.direccion.estado',
  ];


@Injectable()
export class DocenteService {
    constructor(
        @InjectRepository(Docente) private repositorioDocente: Repository < Docente >,
        private servicioCurso: CursoService,
    ){}
    async crear(docente: DocenteDTO): Promise< Docente >{
        const nuevoAdmin = this.repositorioDocente.create(docente);
        return this.repositorioDocente.save(nuevoAdmin);
    }

    async obtenerDocente(idUsuario: string): Promise< Docente | null>{
        const admin = await this.repositorioDocente.findOne({idUsuario},{ relations: relacionesDocente });
        return admin;
    }
    async obtenerDocentees(): Promise< Docente[] >{
        const docentees = this.repositorioDocente.find({ relations: relacionesDocente });
        return docentees;
    }

    async obtenerIdCursos(id: string): Promise< string[] > {
        return this.servicioCurso.obtenerIdCursosDocente(id); 
    }
}
