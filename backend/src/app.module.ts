import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { BrandModule } from './modules/brand/brand.module';

@Module({
  imports: [DatabaseModule, CategoryModule, ProductModule, BrandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
