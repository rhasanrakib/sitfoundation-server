import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarksEntity } from './entity/marks.entity';

@Injectable()
export class EntityService {
  constructor(
    @InjectRepository(MarksEntity)
    public readonly marksRepo: Repository<MarksEntity>,
  ) {}
}
