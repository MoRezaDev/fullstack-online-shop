import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from '../../database/database.module';
import { ProductModule } from '../product/product.module';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [DatabaseModule,ProductModule],
})
export class CartModule {}
