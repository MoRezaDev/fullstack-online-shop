import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { DatabaseService } from '../../database/database.service';
import slugify from 'slugify';

@Injectable()
export class SellerService {
  constructor(private databaseService: DatabaseService) {}

  async create(createSellerDto: CreateSellerDto) {
    return this.databaseService.seller.create({
      data: {
        ...createSellerDto,
        url: `/seller/${slugify(createSellerDto.title)}`,
      },
    });
  }

  async findAll() {
    return await this.databaseService.seller.findMany({
      include: { brands: true },
    });
  }

  async findOne(id: string) {
    return await this.databaseService.seller.findUnique({ where: { id } });
  }

  async update(id: string, updateSellerDto: UpdateSellerDto) {
    return await this.databaseService.seller.update({
      where: { id },
      data: updateSellerDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.seller.delete({ where: { id } });
  }
  async removeAll() {
    return await this.databaseService.seller.deleteMany();
  }
}
