import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AddProductToSellerDto } from './dto/add-products.dto';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  @ApiOperation({ summary: 'Create new Seller' })
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.create(createSellerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Sellers' })
  findAll() {
    return this.sellerService.findAll();
  }

  @Post('add-product')
  @ApiOperation({ summary: 'Add products to seller' })
  async addProductsToSeller(
    @Body() addProdcutToSellerDto: AddProductToSellerDto,
  ) {
    return this.sellerService.addProductsToSeller(addProdcutToSellerDto);
  }

  @Delete('remove-all')
  @ApiOperation({ summary: 'remove all Sellers' })
  async removeAll() {
    return this.sellerService.removeAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific Seller' })
  findOne(@Param('id') id: string) {
    return this.sellerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Upadate specific Seller' })
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.update(id, updateSellerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete specific Seller' })
  remove(@Param('id') id: string) {
    return this.sellerService.remove(id);
  }
}
