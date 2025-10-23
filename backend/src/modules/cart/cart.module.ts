import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from '../../database/database.module';
import { ProductModule } from '../product/product.module';
import { GuestCartService } from './guest-cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService, GuestCartService],
  imports: [DatabaseModule, ProductModule],
  exports: [CartService],
})
export class CartModule {}
