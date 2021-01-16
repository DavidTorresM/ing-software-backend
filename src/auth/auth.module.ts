import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

import { DocenteModule } from '../docente/docente.module';
import { AlumnoModule } from '../alumno/alumno.module';
import { AdministradorModule } from '../administrador/administrador.module';
//Fecha de expiracion y la clave secreta
@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  imports: [
    AdministradorModule,
    AlumnoModule,
    DocenteModule,
    UsuarioModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
