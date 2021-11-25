import { Injectable } from '@nestjs/common';
import { unlinkSync } from 'fs';
import * as XLSX from 'xlsx';
import { UpdateSitfoundationDto } from './dto/update-sitfoundation.dto';
@Injectable()
export class SitfoundationService {
  public async insertResult(fileDir: string): Promise<string | Error> {
    const workbook = XLSX.readFile(fileDir);
    const sheet_name_list = workbook.SheetNames;
    console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]));
    try {
      unlinkSync(fileDir);
    } catch (err) {
      console.error(err);
    }
    return 'x';
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
