import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { DatabaseService } from '../../database/database.service';
import { persianSlugify } from '../../common/helper/functions';
import { addCategoryToBrandDto } from './dto/add-category-to-brand.dto';
import { CategoryService } from '../category/category.service';
import { brandExceptions } from '../../common/messages/exceptions.message';

@Injectable()
export class BrandService {
  constructor(
    private databaseService: DatabaseService,
    private categoryService: CategoryService,
  ) {}
  async create(createBrandDto: CreateBrandDto) {
    return await this.databaseService.brand.create({
      data: {
        ...createBrandDto,
        url: `/brand/${persianSlugify(createBrandDto.title)}`,
      },
    });
  }

  async findAll() {
    return await this.databaseService.brand.findMany({include: {categories: true}});
  }

  async findOne(id: string) {
    return await this.databaseService.brand.findUnique({ where: { id } });
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    return await this.databaseService.brand.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.brand.delete({ where: { id } });
  }
  async removeAll() {
    return await this.databaseService.brand.deleteMany();
  }

  async addCategoryToBrand(addCategoryToBrandDto: addCategoryToBrandDto) {
    const [brand, category] = await Promise.all([
      this.checkBrandExists(addCategoryToBrandDto.brandId),
      this.categoryService.checkCategoryExists(
        addCategoryToBrandDto.categoryId,
      ),
    ]);

    return await this.databaseService.brand.update({
      where: { id: brand.id },
      data: {
        categories: {
          connect: { id: category.id },
        },
      },
    });
  }

  async addProductToBrand() {}

  async checkBrandExists(brandId: string) {
    const brand = await this.databaseService.brand.findUnique({
      where: { id: brandId },
    });
    if (!brand) throw new BadRequestException(brandExceptions.notFound);
    return brand;
  }
}
