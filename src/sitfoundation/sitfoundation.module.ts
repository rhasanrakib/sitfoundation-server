import { Module } from '@nestjs/common';
import { SitfoundationController } from './sitfoundation.controller';
import { SitfoundationService } from './sitfoundation.service';

@Module({
  controllers: [SitfoundationController],
  providers: [SitfoundationService],
})
export class SitfoundationModule {}
