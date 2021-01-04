import { Test, TestingModule } from '@nestjs/testing';
import { ColoniaController } from './colonia.controller';

describe('ColoniaController', () => {
  let controller: ColoniaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColoniaController],
    }).compile();

    controller = module.get<ColoniaController>(ColoniaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
