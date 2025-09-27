import { Injectable } from '@nestjs/common';
import { CreateColorDto, CreateMultiColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ColorService {
  constructor(private databaseService: DatabaseService) {}
  async create(createColorDto: CreateColorDto) {
    return await this.databaseService.color.create({ data: createColorDto });
  }

  async createColors(CreateMultiColorDto: CreateMultiColorDto) {
    return await this.databaseService.color.createMany({
      data: CreateMultiColorDto.colors,
    });
  }

  async findAll() {
    return await this.databaseService.color.findMany();
  }

  async findOne(id: number) {
    return await this.databaseService.color.findUnique({ where: { id } });
  }

  async update(id: number, updateColorDto: UpdateColorDto) {
    return await this.databaseService.color.update({
      where: { id },
      data: updateColorDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.color.delete({ where: { id } });
  }

  async removeAll() {
    return await this.databaseService.color.deleteMany();
  }
}
