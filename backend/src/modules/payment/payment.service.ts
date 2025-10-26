import { ForbiddenException, Injectable } from '@nestjs/common';
import { checkUserNotPaidDto } from './dto/check-user-not-paid.dto';
import { DatabaseService } from '../../database/database.service';
import { OrderService } from '../order/order.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly orderService: OrderService,
  ) {}
  async checkUserNotPaid(checkUserNotPaidDto: checkUserNotPaidDto) {
    const order = await this.orderService.checkOrderExist(
      checkUserNotPaidDto.orderId,
    );
    const successPayment = order.payment_details.some(
      (paymentItem) => paymentItem.status === 'success',
    );
    if (successPayment)
      throw new ForbiddenException('این سفارش قبلا پرداخت شده');

    return { success: true };
  }
}
