import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ProductService {
  constructor(private databaseService: DatabaseService) {}
  async create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll() {
    return `This action returns all product`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
