import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class CategoryService {
  constructor(private databaseService: DatabaseService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    if (createCategoryDto.parentId) {
      const parent = await this.checkParentCategoryExists(
        createCategoryDto.parentId,
      );

      const filteredBreadcrumbParent = parent.breadcrumb.map((bread) => ({
        title: bread.title,
        title_fa: bread.title_fa,
        url: bread.url,
      }));

      const url = `${parent.breadcrumb[parent.breadcrumb.length - 1].url}/${createCategoryDto.title}`;

      const breadcrumbArray = [
        ...filteredBreadcrumbParent,
        {
          title: createCategoryDto.title,
          title_fa: createCategoryDto.title_fa,
          url,
        },
      ];

      return await this.databaseService.category.create({
        data: {
          title: createCategoryDto.title,
          title_fa: createCategoryDto.title_fa,
          parentId: parent.id,
          breadcrumb: {
            create: breadcrumbArray,
          },
        },
      });
    }

    return await this.databaseService.category.create({
      data: {
        title: createCategoryDto.title,
        title_fa: createCategoryDto.title_fa,
        breadcrumb: {
          create: {
            title: createCategoryDto.title,
            title_fa: createCategoryDto.title_fa,
            url: `/category/${createCategoryDto.title}`,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.databaseService.category.findMany({
      include: {
        breadcrumb: true,
        children: true,
        parent: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.databaseService.category.findUnique({where: {id}})
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.databaseService.category.update({where: {id},data: updateCategoryDto})
  }

  async remove(id: string) {
    return await this.databaseService.category.delete({ where: { id } });
  }

  async removeAll() {
    return await this.databaseService.category.deleteMany();
  }

  //utility functions
  async checkParentCategoryExists(parentId: string) {
    const parent = await this.databaseService.category.findUnique({
      where: { id: parentId },
      include: { breadcrumb: true },
    });
    if (!parent) throw new BadRequestException('no parent found!');
    return parent;
  }

  async checkCategoryExists(categoryId: string) {
    const category = await this.databaseService.category.findUnique({
      where: { id: categoryId },
      include: {
        breadcrumb: true,
        children: true,
        parent: true,
        products: true,
      },
    });
    if (!category) throw new BadRequestException('no category found!');
    return category;
  }
}
