import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DatabaseService } from '../../database/database.service';
import { categoryExceptions } from '../../common/messages/exceptions.message';
import { persianSlugify } from '../../common/helper/functions';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private databaseService: DatabaseService) {}
  async createCategory(createCategoryDto: CreateCategoryDto) {
    if (createCategoryDto.parentId) {
      return await this.createCategoryWithParentId(createCategoryDto);
    }

    return await this.createRootCategory(createCategoryDto);
  }

  async checkCategoryExists(categoryId: string) {
    const category = await this.databaseService.category.findUnique({
      where: { id: categoryId },
      include: {
        breadcrumb: { select: { title: true, title_fa: true, url: true } },
      },
    });
    if (!category) throw new BadRequestException(categoryExceptions.notFound);
    return category;
  }

  async createRootCategory(createCategoryDto: CreateCategoryDto) {
    return await this.databaseService.category.create({
      data: {
        ...createCategoryDto,
        breadcrumb: {
          create: [
            {
              title: 'onlineshop',
              title_fa: 'فروشگاه آنلاین',
              url: '/',
            },
            {
              title: createCategoryDto.title,
              title_fa: createCategoryDto.title_fa,
              url: `/category/${persianSlugify(createCategoryDto.title)}`,
            },
          ],
        },
      },
      include: { breadcrumb: true },
    });
  }

  async createCategoryWithParentId(createCategoryDto: CreateCategoryDto) {
    if (!createCategoryDto.parentId)
      throw new BadRequestException(categoryExceptions.idFormat);
    const parent = await this.checkCategoryExists(createCategoryDto.parentId);
    const parentLastBreadcrumbUrl =
      parent.breadcrumb[parent.breadcrumb.length - 1].url;

    const breadcrumb = [
      ...parent.breadcrumb,
      {
        title: createCategoryDto.title,
        title_fa: createCategoryDto.title_fa,
        url: `${parentLastBreadcrumbUrl}/${persianSlugify(createCategoryDto.title)}`,
      },
    ];
    return await this.databaseService.category.create({
      data: {
        parentId: parent.id,
        title: createCategoryDto.title,
        title_fa: createCategoryDto.title_fa,
        breadcrumb: { create: breadcrumb },
      },
      include: { breadcrumb: true },
    });
  }

  async findAll() {
    return await this.databaseService.category.findMany({
      include: { brands: true, breadcrumb: true, children: true, parent: true },
    });
  }

  async findOne(categoryId: string) {
    return await this.checkCategoryExists(categoryId);
  }

  async update(categoryId: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.databaseService.category.update({
      where: { id: categoryId },
      data: updateCategoryDto,
    });
  }

  async remove(categoryId: string) {
    return await this.databaseService.category.delete({
      where: { id: categoryId },
    });
  }

  async removeAll() {
    return this.databaseService.category.deleteMany();
  }
}
