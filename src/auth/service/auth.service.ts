import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../../usuario/service/usuario.service';
import { encryptText } from '../../utils/string.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usuarioService.obtenerUsuarioPorEmailPassword(username);
      console.log(user);
      if (user && user.contrasenia === encryptText(pass)) {
        const { contrasenia, ...result } = user;
        return result;
      }
      return null;
    }
    async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        console.log("************************++",payload,user);
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
