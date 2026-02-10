import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from '../../database/database.module';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [DatabaseModule,BrandModule,CategoryModule],
  exports: [ProductService]
})
export class ProductModule {}
