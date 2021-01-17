import { Injectable } from '@nestjs/common';

import { UsuarioService } from '../../usuario/service/usuario.service';
import { DocenteService } from '../../docente/service/docente.service';
import { AlumnoService } from '../../alumno/service/alumno.service';
import { AdministradorService } from '../../administrador/service/administrador.service';

import { encryptText, Privilege } from '../../utils/string.util';
import { JwtService } from '@nestjs/jwt';
import { Alumno } from 'src/alumno/alumno.entity';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private alumnoService:  AlumnoService,
        private docenteService: DocenteService,
        private adminService:   AdministradorService,
        private jwtService: JwtService) {}
    
    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usuarioService.obtenerUsuarioPorEmailPassword(username);
      if (user && user.contrasenia === encryptText(pass)) {
        const { contrasenia,...result } = user;
        return result;
      }
      return null;
    }
    async getPrivilege( id : string ) : Promise<Privilege> {
      let privilegio;
      await this.adminService.obtenerAdministrador(id)&& (privilegio = Privilege.ADMINISTRADOR) ||
      await this.alumnoService.obtenerAlumnoPorId(id) && (privilegio = Privilege.ALUMNO) ||
      await this.docenteService.obtenerDocente(id)    && (privilegio = Privilege.DOCENTE);
      return privilegio;
    }
    // Funcion que se llama cuando hace el login
    async login(user: any) {
        const payload = { username: user.email, sub: user.id, privilege: await this.getPrivilege(user.id) };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    



}
