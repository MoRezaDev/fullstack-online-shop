import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from '../../database/database.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    private databaseService: DatabaseService,
    private categoryService: CategoryService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryService.checkCategoryExists(
      createProductDto.categoryId,
    );

    const breadCrumbArray = category.breadcrumb.map(bread => ({
      title: bread.title,
      title_fa: bread.title_fa,
      url: bread.url,
    })).push()
    return await this.databaseService.product.create({
      data: {
        title: createProductDto.title,
        description: createProductDto.description,
        name: createProductDto.name,
        main_image: createProductDto.main_image ?? '',
        categoryId: category.id,
        brandId: createProductDto.brandId,
        url: `/product/${createProductDto.title}`
          .trim()
          .toLocaleLowerCase()
          .replace(/\s+/g, '-'),
        colors: {
          connect: createProductDto.colorsId.map((id) => ({ id })),
        },
        seller: {
          connectOrCreate: {
            where: { id: createProductDto.sellerId },
            create: {
              title: 'OnlineShop',
              title_fa: `انلاین شاپ`,
              url: `/seller/online-shop`,
              grade: {
                create: {
                  color: '#',
                  label: 'نامشخص',
                },
              },
            },
          },
        },
        breadcrumb: {
          create: []
        }
      },
    });
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
