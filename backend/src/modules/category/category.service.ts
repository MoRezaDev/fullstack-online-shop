import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class CategoryService {
  constructor(private databaseService: DatabaseService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    if (createCategoryDto.parentId) {
      const parent = await this.databaseService.category.findUnique({
        where: { id: createCategoryDto.parentId },
        include: { breadcrumb: true },
      });
      if (!parent) throw new BadRequestException('no parent found!');

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
            url: `/${createCategoryDto.title}`,
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

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
