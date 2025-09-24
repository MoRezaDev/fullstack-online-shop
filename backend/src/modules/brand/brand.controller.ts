import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new brand' })
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  async findAll() {
    return this.brandService.findAll();
  }

  @Delete('remove-all')
  @ApiOperation({ summary: 'Removes all brands' })
  async removeAll() {
    return this.brandService.removeAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific brand' })
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update specific brand' })
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove specific brand' })
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
