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
import { CreateColorDto, CreateMultiColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @ApiOperation({ summary: 'Create color' })
  async create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all colors' })
  async findAll() {
    return this.colorService.findAll();
  }

  @Post('create-multi')
  @ApiOperation({ summary: 'Create multiple colors' })
  async createColors(@Body() CreateMultiColorDto: CreateMultiColorDto) {
    return this.colorService.createColors(CreateMultiColorDto);
  }

  @Delete('remove-all')
  async removeAll() {
    return this.colorService.removeAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific color' })
  async findOne(@Param('id') id: string) {
    return this.colorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update specific color' })
  async update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorService.update(+id, updateColorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete specific color' })
  async remove(@Param('id') id: string) {
    return this.colorService.remove(+id);
  }
}
