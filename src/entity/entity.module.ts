import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';
import { MarksEntity } from './entity/marks.entity';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MarksEntity])],
  controllers: [EntityController],
  providers: [EntityService],
  exports: [TypeOrmModule.forFeature([MarksEntity]), EntityService],
})
export class EntityModule {}
