import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class SellerService {
  constructor(private databaseService: DatabaseService) {}
  async create(createSellerDto: CreateSellerDto) {
    return await this.databaseService.seller.create({
      data: {
        title: createSellerDto.title,
        title_fa: createSellerDto.title_fa,
        url: `/seller/${createSellerDto.title.trim().toLocaleLowerCase().replace(/\s+/g, '-')}`,
        grade: {
          create: {
            color: '#',
            label: 'نامشخص',
          },
        },
        properties: {
          create: {},
        },
      },
    });
  }

  async findAll() {
    return await this.databaseService.seller.findMany({
      include: {
        grade: true,
        products: true,
        properties: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.databaseService.seller.findUnique({ where: { id } });
  }

  async update(id: string, updateSellerDto: UpdateSellerDto) {
    return await this.databaseService.seller.update({where : {id},data: updateSellerDto})
  }

  async remove(id: string) {
    return await this.databaseService.seller.delete({where: {id}})
  }

  async removeAll() {
    return await this.databaseService.seller.deleteMany();
  }
}
