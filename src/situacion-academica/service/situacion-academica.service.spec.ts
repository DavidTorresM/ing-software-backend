import { Test, TestingModule } from '@nestjs/testing';
import { SituacionAcademicaService } from './situacion-academica.service';

describe('SituacionAcademicaService', () => {
  let service: SituacionAcademicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SituacionAcademicaService],
    }).compile();

    service = module.get<SituacionAcademicaService>(SituacionAcademicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
