import { Test, TestingModule } from '@nestjs/testing';
import { DelegacionService } from './delegacion.service';

describe('DelegacionService', () => {
  let service: DelegacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DelegacionService],
    }).compile();

    service = module.get<DelegacionService>(DelegacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
