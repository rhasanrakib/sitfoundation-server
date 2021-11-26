import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  IndividualResultDto,
  ResultBySequenceDto,
  ResultByYearDto,
} from './dto/result.dto';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { CommonSerializer } from './serializer/common.serializer';
import { ResultSerializer } from './serializer/result.serializer';
import { SitfoundationService } from './sitfoundation.service';
@Controller('sitfoundation')
export class SitfoundationController {
  constructor(private readonly sitfoundationService: SitfoundationService) {}

  @Post('insert-result-bulk')
  @UseInterceptors(
    FileInterceptor('result', {
      storage: diskStorage({
        destination: 'upload/result_xls',
        filename: (req, file, callback) => {
          const name = uuidv4();
          const fileExtName = extname(file.originalname);
          callback(null, `${name}${fileExtName}`);
        },
      }),
    }),
    ResponseInterceptor,
  )
  public async insertResultBulk(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CommonSerializer> {
    const fileDir = join(process.cwd(), 'upload/result_xls/' + file.filename);
    const res = await this.sitfoundationService.insertResultBulk(fileDir);
    if (res instanceof Error) {
      return new CommonSerializer(
        HttpStatus.BAD_REQUEST,
        res.name,
        [],
        res.message,
      );
    }
    return new CommonSerializer(HttpStatus.OK, 'success', res, []);
  }

  @UseInterceptors(ResponseInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('get-all-result-by-year')
  public async getAllResultByYear(
    @Query() resultByYear: ResultByYearDto,
  ): Promise<ResultSerializer> {
    const res = await this.sitfoundationService.getAllResultByYear(
      resultByYear.passing_year,
    );
    if (res.length > 0) {
      return new ResultSerializer(HttpStatus.OK, 'success', res, []);
    } else {
      return new ResultSerializer(
        HttpStatus.NOT_FOUND,
        'failed',
        [],
        'not found',
      );
    }
  }

  @UseInterceptors(ResponseInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('get-all-result-by-sequence')
  public async getAllResultBySequence(
    @Query() resultBySequence: ResultBySequenceDto,
  ) {
    const res = await this.sitfoundationService.getAllResultBySequence(
      resultBySequence.sequence,
    );
    if (res.length > 0) {
      return new ResultSerializer(HttpStatus.OK, 'success', res, []);
    } else {
      return new ResultSerializer(
        HttpStatus.NOT_FOUND,
        'failed',
        [],
        'not found',
      );
    }
  }

  @UseInterceptors(ResponseInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('get-individual-result')
  public async getIndividualResult(
    @Query() indiviualResult: IndividualResultDto,
  ) {
    const res = await this.sitfoundationService.getIndividualResult(
      indiviualResult,
    );
    if (res) {
      return new ResultSerializer(HttpStatus.OK, 'success', res, []);
    } else {
      return new ResultSerializer(
        HttpStatus.NOT_FOUND,
        'failed',
        [],
        'not found',
      );
    }
  }

  @UseInterceptors(ResponseInterceptor)
  @Get('get-all-result')
  public async getAllResult() {
    const res = await this.sitfoundationService.getAllResult();
    if (res.length > 0) {
      return new ResultSerializer(HttpStatus.OK, 'success', res, []);
    } else {
      return new ResultSerializer(
        HttpStatus.NOT_FOUND,
        'failed',
        [],
        'not found',
      );
    }
  }
}
