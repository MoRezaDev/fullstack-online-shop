import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { CategoryModule } from '../category/category.module';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [CategoryModule,DatabaseModule],

})
export class BrandModule {}
