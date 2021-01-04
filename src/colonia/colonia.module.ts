import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Colonia } from './colonia.entity';
import { ColoniaService } from './service/colonia.service';
import { ColoniaController } from './controller/colonia.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Colonia]),
  ],
  providers: [ColoniaService],
  controllers: [ColoniaController]
})
export class ColoniaModule {}
