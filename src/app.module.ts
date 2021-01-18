import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColoniaModule } from './colonia/colonia.module';
import { DireccionModule } from './direccion/direccion.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DelegacionModule } from './delegacion/delegacion.module';
import { EstadoModule } from './estado/estado.module';
import { DocenteModule } from './docente/docente.module';
import { AdministradorModule } from './administrador/administrador.module';
import { SituacionAcademicaModule } from './situacion-academica/situacion-academica.module';
import { AlumnoModule } from './alumno/alumno.module';
import { MateriaModule } from './materia/materia.module';
import { CursoModule } from './curso/curso.module';
import { SalaModule } from './sala/sala.module';
import { MensajeModule } from './mensaje/mensaje.module';
import { PublicacionModule } from './publicacion/publicacion.module';
import { ArchivoModule } from './archivo/archivo.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '130997',
      database: 'Polimeet',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    ColoniaModule,
    DireccionModule,
    UsuarioModule,
    DelegacionModule,
    EstadoModule,
    DocenteModule,
    AdministradorModule,
    SituacionAcademicaModule,
    AlumnoModule,
    MateriaModule,
    CursoModule,
    SalaModule,
    MensajeModule,
    PublicacionModule,
    ArchivoModule,
    AuthModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
