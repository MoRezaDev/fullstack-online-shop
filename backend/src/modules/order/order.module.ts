import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user/user.module';
import { CartModule } from '../cart/cart.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [DatabaseModule,UserModule,CartModule],
})
export class OrderModule {}
