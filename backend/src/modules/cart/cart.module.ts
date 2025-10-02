import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [DatabaseModule]
})
export class CartModule {}
