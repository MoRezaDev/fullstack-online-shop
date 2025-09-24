import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { DatabaseService } from '../../database/database.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class BrandService {
  constructor(
    private databaseService: DatabaseService,
    private categoryServices: CategoryService,
  ) {}
  async create(createBrandDto: CreateBrandDto) {
    if (createBrandDto.categoryId) {
      const category = await this.categoryServices.checkCategoryExists(
        createBrandDto.categoryId,
      );
      return await this.databaseService.brand.create({
        data: {
          title: createBrandDto.title,
          title_fa: createBrandDto.title_fa,
          description: createBrandDto.description,
          url: `/brand/${createBrandDto.title}`,
          categories: {
            connect: {
              id: category.id,
            },
          },
        },
      });
    }
    return await this.databaseService.brand.create({
      data: {
        title: createBrandDto.title,
        title_fa: createBrandDto.title_fa,
        description: createBrandDto.description,
        url: `/brand/${createBrandDto.title}`,
      },
    });
  }

  async findAll() {
    return await this.databaseService.brand.findMany({
      include: { categories: true, products: true },
    });
  }

  async findOne(id: string) {
    return await this.databaseService.brand.findUnique({where: {id}})
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    return await this.databaseService.brand.update({where: {id},data: updateBrandDto})
  }

  async remove(id: string) {
    return await this.databaseService.brand.delete({where: {id}})
  }

  async removeAll() {
    return await this.databaseService.brand.deleteMany();
  }
}
