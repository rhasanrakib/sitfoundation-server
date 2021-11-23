import { Injectable } from '@nestjs/common';
import { InsertResultDto } from './dto/insertResult.dto';
import { UpdateSitfoundationDto } from './dto/update-sitfoundation.dto';

@Injectable()
export class SitfoundationService {
  insertResult(insertResultDto: InsertResultDto) {
    return 'This action adds a new sitfoundation';
  }

  findAll() {
    return `This action returns all sitfoundation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sitfoundation`;
  }

  update(id: number, updateSitfoundationDto: UpdateSitfoundationDto) {
    return `This action updates a #${id} sitfoundation`;
  }

  remove(id: number) {
    return `This action removes a #${id} sitfoundation`;
  }
}
