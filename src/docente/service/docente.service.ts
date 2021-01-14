import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Admin, Repository } from 'typeorm';

import { Docente } from '../docente.entity';
import { DocenteDTO } from '../interface/docente.interface';

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
        @InjectRepository(Docente) private repositorioDocente: Repository < Docente >
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
}
