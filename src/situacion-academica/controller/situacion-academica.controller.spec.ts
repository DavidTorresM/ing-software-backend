import { Test, TestingModule } from '@nestjs/testing';
import { SituacionAcademicaController } from './situacion-academica.controller';

describe('SituacionAcademicaController', () => {
  let controller: SituacionAcademicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SituacionAcademicaController],
    }).compile();

    controller = module.get<SituacionAcademicaController>(SituacionAcademicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
