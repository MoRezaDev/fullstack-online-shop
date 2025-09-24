import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @ApiOperation({ summary: 'Create color' })
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all colors' })
  findAll() {
    return this.colorService.findAll();
  }

  @Delete('remove-all')
  async removeAll() {
    return this.colorService.removeAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific color' })
  findOne(@Param('id') id: string) {
    return this.colorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update specific color' })
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorService.update(+id, updateColorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete specific color' })
  remove(@Param('id') id: string) {
    return this.colorService.remove(+id);
  }
}
