import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { DatabaseModule } from '../../database/database.module';
import { OrderModule } from '../order/order.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [DatabaseModule,OrderModule]
})
export class PaymentModule {}
