import { Injectable } from '@nestjs/common';

import { UsuarioService } from '../../usuario/service/usuario.service';
import { DocenteService } from '../../docente/service/docente.service';
import { AlumnoService } from '../../alumno/service/alumno.service';
import { AdministradorService } from '../../administrador/service/administrador.service';

import { encryptText, Privilege } from '../../utils/string.util';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO, RespuestaLogin } from '../interfaces/auth.interface';
import { Usuario } from '../../usuario/usuario.entity'
@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private alumnoService:  AlumnoService,
        private docenteService: DocenteService,
        private adminService:   AdministradorService,
        private jwtService: JwtService) {}
    
    async validateUser(username: string, pass: string): Promise< Usuario | null > {
      const user = await this.usuarioService.obtenerUsuarioPorEmailPassword(username);
      
      if (user && user.contrasenia === encryptText(pass)) {
        return user;
      }

      return null;
    }
    async getPrivilege( id : string ) : Promise<Privilege> {
      let privilegio: Privilege;
      
      await this.adminService.obtenerAdministrador(id)&& (privilegio = Privilege.ADMINISTRADOR) ||
      await this.alumnoService.obtenerAlumnoPorId(id) && (privilegio = Privilege.ALUMNO) ||
      await this.docenteService.obtenerDocente(id)    && (privilegio = Privilege.DOCENTE);
      
      return privilegio;
    }

    // Funcion que se llama cuando hace el login
    async login(user: LoginDTO): Promise< RespuestaLogin | null > {
      const usuario = await this.validateUser(user.email, user.contrasenia);

      if (!usuario) {
        return null;
      }

      const privilegio  = await this.getPrivilege(usuario.id);

      const payload = {
        username: usuario.email,
        sub: usuario.id,
        privilege: privilegio 
      };
        
      return {
        email: usuario.email,
        id: usuario.id,
        privilegio, 
        access_token: this.jwtService.sign(payload),
      };
    }
}
