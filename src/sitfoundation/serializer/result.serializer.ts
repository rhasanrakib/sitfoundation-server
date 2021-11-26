import { Exclude, plainToClass } from 'class-transformer';
import { BaseSerializer } from '../../app.serializer';
class Result {
  readonly reg_number: string;
  readonly gpa: number;
  readonly passing_year: string;
  readonly sequence: string;
  @Exclude()
  readonly id: number;
}
export class ResultSerializer extends BaseSerializer {
  constructor(
    statusCode: number,
    message: string,
    data: any,
    errors: any,
    optional?: Record<string, unknown>,
  ) {
    super(statusCode, message, plainToClass(Result, data), errors);
  }
}
