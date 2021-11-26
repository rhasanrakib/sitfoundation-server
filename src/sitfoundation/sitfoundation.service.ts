import { Injectable } from '@nestjs/common';
import { unlinkSync } from 'fs';
import { MarksEntity } from 'src/entity/entity/marks.entity';
import * as uuid from 'uuid';
import * as XLSX from 'xlsx';
import { EntityService } from '../entity/entity.service';
import { UpdateSitfoundationDto } from './dto/update-sitfoundation.dto';
@Injectable()
export class SitfoundationService {
  constructor(private readonly entityService: EntityService) {}

  public async insertResult(fileDir: string): Promise<MarksEntity | Error> {
    const workbook = XLSX.readFile(fileDir);
    const sheet_name_list = workbook.SheetNames;
    const jsonData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]],
    );

    const sequences = uuid.v4();
    const marks = [];
    for (const i in jsonData) {
      const marksObj = {
        reg_number: jsonData[i]['RegNum'],
        gpa: jsonData[i]['GPA'].toFixed(2),
        passing_year: jsonData[i]['PassingYear'],
        sequence: sequences,
      };
      marks.push(marksObj);
    }

    try {
      const res = (await this.entityService.marksRepo.save(
        marks,
      )) as unknown as MarksEntity;
      unlinkSync(fileDir);
      return res;
    } catch (err) {
      return err;
      console.error(err);
    }
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
function uuidv4() {
  throw new Error('Function not implemented.');
}
