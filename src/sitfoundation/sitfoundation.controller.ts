import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SitfoundationService } from './sitfoundation.service';
import { InsertResultDto } from './dto/insertResult.dto';
import { UpdateSitfoundationDto } from './dto/update-sitfoundation.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('sitfoundation')
export class SitfoundationController {
  constructor(private readonly sitfoundationService: SitfoundationService) {}

  @Post('insert-result')
  @UseInterceptors(FileInterceptor('result'))
  insertResult(
    @UploadedFile() file: Express.Multer.File,
    @Body() insertResultDto: InsertResultDto,
  ) {
    return this.sitfoundationService.insertResult(insertResultDto);
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
