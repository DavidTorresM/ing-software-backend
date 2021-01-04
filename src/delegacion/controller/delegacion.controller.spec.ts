import { Test, TestingModule } from '@nestjs/testing';
import { DelegacionController } from './delegacion.controller';

describe('DelegacionController', () => {
  let controller: DelegacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DelegacionController],
    }).compile();

    controller = module.get<DelegacionController>(DelegacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
