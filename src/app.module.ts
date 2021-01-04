import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColoniaModule } from './colonia/colonia.module';
import { DireccionModule } from './direccion/direccion.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DelegacionModule } from './delegacion/delegacion.module';
import { EstadoModule } from './estado/estado.module';

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
    EstadoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
