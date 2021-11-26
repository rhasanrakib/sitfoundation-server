import { Injectable } from '@nestjs/common';
import { unlinkSync } from 'fs';
import * as uuid from 'uuid';
import * as XLSX from 'xlsx';
import { EntityService } from '../entity/entity.service';
import { MarksEntity } from '../entity/entity/marks.entity';
import { IndividualResultDto } from './dto/result.dto';
@Injectable()
export class SitfoundationService {
  constructor(private readonly entityService: EntityService) {}

  public async insertResultBulk(fileDir: string): Promise<MarksEntity | Error> {
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
      console.error(err);
      return err;
    }
  }
  public async getIndividualResult(individualResult: IndividualResultDto) {
    //console.log(individualResult);
    const res = await this.entityService.marksRepo.findOne({
      where: {
        reg_number: individualResult.registration_number,
        passing_year: individualResult.passing_year,
      },
    });
    //console.log(res);
    return res;
  }
  public async getAllResultByYear(year: string) {
    const res = await this.entityService.marksRepo.find({
      where: {
        passing_year: year,
      },
    });
    return res;
  }
  public async getAllResultBySequence(sequence: string) {
    const res = await this.entityService.marksRepo.find({
      where: {
        sequence: sequence,
      },
    });
    return res;
  }

  public async getAllResult() {
    return await this.entityService.marksRepo.find({});
  }
}
