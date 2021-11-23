import { Test, TestingModule } from '@nestjs/testing';
import { SitfoundationService } from './sitfoundation.service';

describe('SitfoundationService', () => {
  let service: SitfoundationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SitfoundationService],
    }).compile();

    service = module.get<SitfoundationService>(SitfoundationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
