import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class AddressService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createAddressDto: CreateAddressDto) {
    return await this.databaseService.address.create({
      data: createAddressDto,
    });
  }

  async findAll() {
    return await this.databaseService.address.findMany({
      include: { user: true },
    });
  }

  async findOne(id: string) {
    return await this.databaseService.address.findUnique({ where: { id } });
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    return await this.databaseService.address.update({
      where: { id },
      data: updateAddressDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.address.delete({ where: { id } });
  }
}
