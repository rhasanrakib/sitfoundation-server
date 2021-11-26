import { IsNotEmpty, IsString } from 'class-validator';

export class IndividualResultDto {
  @IsString()
  @IsNotEmpty()
  readonly registration_number: string;
  @IsString()
  @IsNotEmpty()
  readonly passing_year: string;
}
export class ResultByYearDto {
  @IsString()
  @IsNotEmpty()
  readonly passing_year: string;
}
export class ResultBySequenceDto {
  @IsString()
  @IsNotEmpty()
  readonly sequence: string;
}
