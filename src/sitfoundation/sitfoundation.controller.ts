import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UpdateSitfoundationDto } from './dto/update-sitfoundation.dto';
import { CommonSerializer } from './serializer/common.serializer';
import { SitfoundationService } from './sitfoundation.service';
@Controller('sitfoundation')
export class SitfoundationController {
  constructor(private readonly sitfoundationService: SitfoundationService) {}

  @Post('insert-result')
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
  )
  public async insertResult(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CommonSerializer> {
    const fileDir = join(process.cwd(), 'upload/result_xls/' + file.filename);
    const res = await this.sitfoundationService.insertResult(fileDir);
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

  @Get()
  findAll() {
    return this.sitfoundationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sitfoundationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSitfoundationDto: UpdateSitfoundationDto,
  ) {
    return this.sitfoundationService.update(+id, updateSitfoundationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sitfoundationService.remove(+id);
  }
}
