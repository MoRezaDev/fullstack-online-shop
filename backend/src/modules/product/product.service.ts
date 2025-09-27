import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from '../../database/database.service';
import { CategoryService } from '../category/category.service';
import { BrandService } from '../brand/brand.service';
import { randomInt } from 'crypto';
import slugify from 'slugify';
import { SellerService } from '../seller/seller.service';
import { generateSeo, persianSlugify } from '../../common/helper/functions';

@Injectable()
export class ProductService {
  constructor(
    private databaseService: DatabaseService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private sellerService: SellerService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const [category, brand, seller] = await Promise.all([
      this.categoryService.checkCategoryExists(createProductDto.categoryId),
      this.brandService.checkBrandExists(createProductDto.brandId),
      this.sellerService.checkSellerExists(createProductDto.sellerId),
    ]);

    const randomNumber = randomInt(100000, 300000);
    const breadCrumbArray = category.breadcrumb.map((bread) => ({
      title: bread.title,
      title_fa: bread.title_fa,
      url: bread.url,
    }));
    if (brand) {
      breadCrumbArray.push({
        title: brand.title,
        title_fa: brand.title_fa,
        url: `${breadCrumbArray[breadCrumbArray.length - 1].url}/${persianSlugify(brand.title)}`,
      });
    }
    breadCrumbArray.push({
      title: createProductDto.name,
      title_fa: createProductDto.title,
      url: `/product/p-${randomNumber}/${persianSlugify(createProductDto.title)}`,
    });
    const seoObj = await generateSeo(
      'product',
      createProductDto.title.toLocaleLowerCase(),
      `/product/p-${randomNumber}/${persianSlugify(createProductDto.title)}`,
    );
    return await this.databaseService.product.create({
      data: {
        title: createProductDto.title,
        product_number: randomNumber,
        description: createProductDto.description,
        name: createProductDto.name,
        main_image: createProductDto.main_image ?? '',
        categoryId: category.id,
        brandId: brand.id,
        category_brand_url: `${category.breadcrumb[category.breadcrumb.length - 1].url}/${persianSlugify(brand.title)}`,
        url: `/product/p-${randomNumber}/${persianSlugify(createProductDto.title)}`,
        colors: {
          connect: createProductDto.colorsId.map((id) => ({ id })),
        },
        seller: {
          connect: {
            id: seller.id,
          },
        },
        breadcrumb: {
          create: breadCrumbArray,
        },
        seo: {
          create: seoObj,
        },
        main_specs: {
          create: {
            title: createProductDto.main_spec.title,
            values: createProductDto.main_spec.values,
          },
        },
        specifications: {
          create: createProductDto.specifications.map((spec) => ({
            title: spec.title,
            attributes: {
              createMany: { data: spec.attributes },
            },
          })),
        },
        rating: {
          create: {},
        },
      },
    });
  }

  async findAll() {
    return await this.databaseService.product.findMany({
      include: {
        brand: true,
        breadcrumb: true,
        category: true,
        colors: true,
        comments: true,
        main_specs: true,
        specifications: { include: { attributes: true } },
        rating: true,
        seo: { include: { open_graph: true } },
        seller: { include: { grade: true, properties: true } },
      },
    });
  }

  async findOne(id: string) {
    return `This action returns a #${id} product`;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    return await this.databaseService.product.delete({ where: { id } });
  }
}
