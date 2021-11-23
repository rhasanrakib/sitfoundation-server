import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SitfoundationModule } from './sitfoundation/sitfoundation.module';

@Module({
  imports: [SitfoundationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
