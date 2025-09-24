import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from '../../database/database.module';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [DatabaseModule,CategoryModule]
})
export class ProductModule {}
