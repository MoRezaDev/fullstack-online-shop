import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from '../../database/database.module';
import { CategoryModule } from '../category/category.module';
import { BrandModule } from '../brand/brand.module';
import { SellerModule } from '../seller/seller.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [DatabaseModule,CategoryModule,BrandModule,SellerModule]
})
export class ProductModule {}
