import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Admin, Repository } from 'typeorm';

import { Administrador } from '../administrador.entity';
import { AdministradorDTO } from '../interface/administrador.interface';

const relacionesAdministrador: string[] = [
    'usuario',
    'usuario.direccion',
    'usuario.direccion.colonia',
    'usuario.direccion.delegacion',
    'usuario.direccion.estado',
  ];


@Injectable()
export class AdministradorService {
    constructor(
        @InjectRepository(Administrador) private repositorioAdministrador: Repository < Administrador >
    ){}
    async crear(administrador: AdministradorDTO): Promise< Administrador >{
        const nuevoAdmin = this.repositorioAdministrador.create(administrador);
        return this.repositorioAdministrador.save(nuevoAdmin);
    }

    async obtenerAdministrador(idUsuario: string): Promise< Administrador | null>{
        const admin = await this.repositorioAdministrador.findOne({idUsuario},{ relations: relacionesAdministrador });
        if(!admin)
            return null;
        return admin;
    }
    async obtenerAdministradores(): Promise< Administrador[] >{
        const administradores = this.repositorioAdministrador.find({ relations: relacionesAdministrador });
        return administradores;
    }
}
