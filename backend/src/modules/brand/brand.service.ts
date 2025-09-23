import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CategoryService } from '../category/category.service';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class BrandService {
  constructor(
    private categoryService: CategoryService,
    private databaseService: DatabaseService,
  ) {}
  async create(createBrandDto: CreateBrandDto) {
    const category = await this.categoryService.checkCategoryExists(
      createBrandDto.categoryId,
    );

    return await this.databaseService.brand.create({
      data: {
        title: createBrandDto.title,
        title_fa: createBrandDto.title_fa,
        description: createBrandDto.description,
        url: `${category.breadcrumb[category.breadcrumb.length - 1].url}/${createBrandDto.title}`,
      },
    });
  }

  async findAll() {
    return await this.databaseService.brand.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
