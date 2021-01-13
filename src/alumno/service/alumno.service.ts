import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm'

import { Alumno } from '../alumno.entity';
import { AlumnoDTO } from '../interface/alumno.interface';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumno) private repositorioAlumno: Repository< Alumno >
  ) {}

  async crear(alumno: AlumnoDTO): Promise< Alumno > {
    const nuevoAlumno = this.repositorioAlumno.create(alumno);

    console.log(alumno);


    return this.repositorioAlumno.save(nuevoAlumno);
  }

  async obtenerAlumnoPorId(id: string): Promise< Alumno | null> {
    const alumno = await this.repositorioAlumno.findOne(
      { idUsuario: id },
      { relations: [
        'situacionAcademica',
        'usuario',
        'usuario.direccion',
        'usuario.direccion.colonia',
        'usuario.direccion.estado',
        'usuario.direccion.delegacion',
      ] }
    );

    if (!alumno) {
      return null;
    }

    return alumno.getFormatResponse();
  }
}
