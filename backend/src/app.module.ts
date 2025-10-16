import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import {  APP_GUARD } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { ProductModule } from './modules/product/product.module';
import { SellerModule } from './modules/seller/seller.module';
import { ColorModule } from './modules/color/color.module';
import { CartModule } from './modules/cart/cart.module';
import { InitModule } from './modules/init/init.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 20,
        },
      ],
    }),
    CategoryModule,
    BrandModule,
    ProductModule,
    SellerModule,
    ColorModule,
    CartModule,
    InitModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
