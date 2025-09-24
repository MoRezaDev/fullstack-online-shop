import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { BrandModule } from './modules/brand/brand.module';
import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from './common/filters/catch-all-exceptions.filter';
import { SellerModule } from './modules/seller/seller.module';

@Module({
  imports: [DatabaseModule, CategoryModule, ProductModule, BrandModule, SellerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
