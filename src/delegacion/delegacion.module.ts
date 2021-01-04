import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Delegacion } from './delegacion.entity';
import { DelegacionService } from './service/delegacion.service';
import { DelegacionController } from './controller/delegacion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Delegacion]),
  ],
  providers: [DelegacionService],
  controllers: [DelegacionController]
})
export class DelegacionModule {}
