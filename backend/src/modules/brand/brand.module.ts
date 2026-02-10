import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { DatabaseModule } from '../../database/database.module';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [DatabaseModule,CategoryModule],
  exports: [BrandService]
})
export class BrandModule {}
