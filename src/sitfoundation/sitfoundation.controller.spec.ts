import { Test, TestingModule } from '@nestjs/testing';
import { SitfoundationController } from './sitfoundation.controller';
import { SitfoundationService } from './sitfoundation.service';

describe('SitfoundationController', () => {
  let controller: SitfoundationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SitfoundationController],
      providers: [SitfoundationService],
    }).compile();

    controller = module.get<SitfoundationController>(SitfoundationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
