import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm'

import { encryptText } from '../../utils/string.util';
import { Usuario } from '../usuario.entity';
import { UsuarioDTO } from '../interface/usuario.interface';
import { SalaService } from 'src/sala/service/sala.service';
import { Sala } from 'src/sala/sala.entity';
import { AlumnoService } from 'src/alumno/service/alumno.service';
import { DocenteService } from 'src/docente/service/docente.service';

const relacionesUsuario: string[] = [
  'direccion',
  'direccion.colonia',
  'direccion.delegacion',
  'direccion.estado',
];

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private repositorioUsuario: Repository< Usuario >,
    private servicioAlumno: AlumnoService,
    private servicioSala: SalaService,
    private servicioDocente: DocenteService,
  ) {}

  async crear(usuario: UsuarioDTO): Promise< Usuario > {
    usuario.contrasenia = encryptText(usuario.contrasenia);

    const nuevoUsuario = this.repositorioUsuario.create(usuario);

    console.log(nuevoUsuario);

    return this.repositorioUsuario.save(nuevoUsuario);
  }

  async obtenerUsuarioPorCampo(nombre: string, valor: string): Promise< Usuario | null> {
    const campos = {
      [nombre]: valor,
    };
   
    const usuario = await this.repositorioUsuario.findOne(
      campos,
      { relations: relacionesUsuario }
    );

    if (!usuario) {
      return null;
    }

    return usuario.getFormatResponse();
  }

  async obtenerUsuarioPorEmailPassword(email: string): Promise< Usuario | null> {
    const campos = {
      email,
    };

    const usuario = await this.repositorioUsuario.findOne(
      campos
    );
    
    if (!usuario) {
      return null;
    }
    
    return usuario;
  }

  async obtenerUsuarioPorId(id: string): Promise< Usuario | null > {
    return this.obtenerUsuarioPorCampo('id', id);
  }

  async obtenerUsuarioPorEmail(email: string): Promise< Usuario | null > {
    return this.obtenerUsuarioPorCampo('email', email);
  }

  async obtenerSalas(id: string): Promise< Sala[] | null> {
    const alumno = await this.servicioAlumno.obtenerAlumnoPorId(id);

    let idCursos = [];

    if (alumno) {
      idCursos = await this.servicioAlumno.obtenerIdCursos(id);
    }
    else {
      idCursos = await this.servicioDocente.obtenerIdCursos(id);
    }
    
    const salas = await this.servicioSala.obtenerSalasPorCursos(idCursos);

    return salas;
  }
}
