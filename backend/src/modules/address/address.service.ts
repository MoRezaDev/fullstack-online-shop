import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class AddressService {
  constructor (private databaseService: DatabaseService) {}
  async create(createAddressDto: CreateAddressDto) {
    return ''
  }

  async findAll() {
    return `This action returns all address`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  async remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
