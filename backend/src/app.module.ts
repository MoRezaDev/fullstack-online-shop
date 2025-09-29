import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { BrandModule } from './modules/brand/brand.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { CatchEverythingFilter } from './common/filters/catch-all-exceptions.filter';
import { SellerModule } from './modules/seller/seller.module';
import { ColorModule } from './modules/color/color.module';
import { CommentModule } from './modules/comment/comment.module';
import { OrderModule } from './modules/order/order.module';
import { AddressModule } from './modules/address/address.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    ProductModule,
    BrandModule,
    SellerModule,
    ColorModule,
    CommentModule,
    OrderModule,
    AddressModule,
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
