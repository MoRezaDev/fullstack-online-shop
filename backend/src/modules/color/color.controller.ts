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
import { CreateColorDto, CreateColorsDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  async create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @Get()
  async findAll() {
    return this.colorService.findAll();
  }

  @Post('create-many')
  async createMany(@Body() createColorsDto: CreateColorsDto) {
    return this.colorService.createMany(createColorsDto);
  }

  @Delete('remove-all')
  async removeAll() {
    return this.colorService.removeAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.colorService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    return this.colorService.update(+id, updateColorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.colorService.remove(+id);
  }
}
