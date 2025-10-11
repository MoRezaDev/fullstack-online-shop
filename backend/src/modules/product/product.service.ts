import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from '../../database/database.service';
import { randomInt } from 'crypto';
import {
  createDefaultSeo,
  persianSlugify,
} from '../../common/helper/functions';
import { BrandService } from '../brand/brand.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    private databaseService: DatabaseService,
    private brandService: BrandService,
    private categoryService: CategoryService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const [brand, category] = await Promise.all([
      this.brandService.checkBrandExists(createProductDto.brandId),
      this.categoryService.checkCategoryExists(createProductDto.categoryId),
    ]);

    if (!brand || !category)
      throw new BadRequestException('اطلاعات برند و کتگوری اشتباه است');
    const randomNumber = randomInt(100000, 299999);
    const { sellerId, colorsId, ...transformedCategoryDto } = createProductDto;
    return await this.databaseService.product.create({
      data: {
        ...transformedCategoryDto,
        product_code: randomNumber,
        url: `/pr-${randomNumber}/${persianSlugify(createProductDto.title_fa)}`,
        brand_category_url: ``,
        specifications: {
          create: {
            title: createProductDto.specifications.title,
            attributes: { create: createProductDto.specifications.attributes },
          },
        },
        main_specification: {
          create: {
            atrribute: { create: createProductDto.main_specification },
          },
        },
        colors: {
          connect: createProductDto.colorsId.map((color) => ({ id: color })),
        },
        seo: { create: createDefaultSeo(createProductDto.title_fa) },
        warehouse: { create: createProductDto.warehouse },
        sellers: { connect: { id: createProductDto.sellerId } },
      },
    });
  }

  async findAll() {
    return await this.databaseService.product.findMany({
      include: {
        brand: true,
        category: true,
        colors: true,
        comments: true,
        product_rating: true,
        specifications: true,
        main_specification: true,
        seo: true,
        warehouse: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.databaseService.product.findUnique({ where: { id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const {
      sellerId,
      brandId,
      categoryId,
      colorsId,
      specifications,
      main_specification,
      warehouse,
      ...transformedUpdateDto
    } = updateProductDto;
    return await this.databaseService.product.update({
      where: { id },
      data: transformedUpdateDto,
    });
  }

  async remove(id: string) {
    return `This action removes a #${id} product`;
  }
  async removeAll() {
    return await this.databaseService.product.deleteMany();
  }

  async checkProductExists(productId: string) {
    const product = await this.databaseService.product.findUnique({
      where: { id: productId }, include: {warehouse: true}
    });
    if (!product) throw new BadRequestException('آیدی محصول پیدا نشد');
    return product;
  }
}
