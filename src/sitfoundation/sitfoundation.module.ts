import { Module } from '@nestjs/common';
import { SitfoundationService } from './sitfoundation.service';
import { SitfoundationController } from './sitfoundation.controller';

@Module({
  controllers: [SitfoundationController],
  providers: [SitfoundationService],
})
export class SitfoundationModule {}
