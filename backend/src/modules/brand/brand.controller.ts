import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { addCategoryToBrandDto } from './dto/add-category-to-brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  async findAll() {
    return this.brandService.findAll();
  }

  @Delete('remove-all')
  async removeAll() {
    return this.brandService.removeAll();
  }

  @Post('add-category')
  async addCategoryToBrand(
    @Body() addCategotyToBrandDto: addCategoryToBrandDto,
  ) {
    return this.brandService.addCategoryToBrand(addCategotyToBrandDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
