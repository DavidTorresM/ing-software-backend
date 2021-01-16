import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Administrador } from './administrador.entity';
import { AdministradorService } from './service/administrador.service';
import { AdministradorController } from './controller/administrador.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Administrador]),
  ],
  providers: [AdministradorService],
  controllers: [AdministradorController],
  exports: [AdministradorService],
})
export class AdministradorModule {}
