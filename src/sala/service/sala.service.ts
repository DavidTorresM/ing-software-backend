import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm';

import { Sala } from '../sala.entity';
import { SalaDTO } from '../interface/sala.interface';


const relacionesSala: string[] = [
  'curso',
  'curso.materia',
  'curso.docente',
  'curso.docente.usuario',
];

@Injectable()
export class SalaService {
  constructor(
    @InjectRepository(Sala) private repositorioSala: Repository< Sala >
  ) {}

  async crear(sala: SalaDTO): Promise< Sala > {
    const nuevaSala = this.repositorioSala.create(sala);
    
    return this.repositorioSala.save(nuevaSala);
  }

  async obtenerSala(id: number): Promise< Sala | null > {
    const sala = await this.repositorioSala.findOne({
      id, 
    },{ relations:relacionesSala });
    
    if(!sala)
      return null;
   
      return sala.getFormatResponse();
  }

  async obtenerSalas(): Promise< Sala[] > {
    const salaes = await this.repositorioSala.find({relations:relacionesSala});
    
    return salaes.map( sala => sala.getFormatResponse() );
  }
}
