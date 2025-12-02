import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { checkUserNotPaidDto } from './dto/check-user-not-paid.dto';
import { DatabaseService } from '../../database/database.service';
import { OrderService } from '../order/order.service';
import { PayDto } from './dto/pay.dto';
import { toPersianDateTime } from '../../common/helper/functions';

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
    const successPayment = order.payment_details?.transaction_history.some(
      (history) => history.status === 'success',
    );
    if (successPayment && order.payment_details?.status === 'paid')
      throw new ForbiddenException('این سفارش قبلا پرداخت شده');

    return { success: true };
  }

  async pay(payDto: PayDto) {
    if (!payDto.transaction_code || !payDto.verify_code)
      throw new BadRequestException('اطلاعات ورودی اشتباه است');

    return await this.databaseService.$transaction(async (tx) => {
      const paymentDetail = await tx.paymentDetail.findUnique({
        where: { verify_code: payDto.verify_code },
        include: { transaction_history: true },
      });
      if (!paymentDetail)
        throw new BadRequestException('اطلاعات پرداخت یافت نشد');

      const successPayment = paymentDetail.transaction_history.some(
        (history) => history.status === 'success',
      );
      if (successPayment && paymentDetail.status === 'paid')
        throw new ForbiddenException(
          `سفارش قبلا پرداخت شده، لطفا کد پیگیری سفارش: ${payDto.transaction_code} را به پشتیبانی جهت عودت مبلغ اطلاع دهید`,
        );

      const updated = await tx.order.update({
        where: { id: payDto.orderId },
        data: {
          status: 'paid',
          payment_details: {
            update: {
              where: { id: paymentDetail.id },
              data: {
                status: 'paid',
                transaction_code: payDto.transaction_code,
                transaction_history: {
                  create: {
                    status: 'success',
                    transaction_date: toPersianDateTime('numbers').date,
                    transaction_time: toPersianDateTime('numbers').time,
                  },
                },
              },
            },
          },
        },
        include: { payment_details: true, order_items: true },
      });

      await Promise.all(
        updated.order_items.map((item) =>
          tx.warehouse.update({
            where: { productId: item.productId },
            data: {
              quantity: { decrement: item.quantity },
            },
          }),
        ),
      );

      return {
        success: true,
        orderId: updated.id,
        verify_code: updated.payment_details?.verify_code,
      };
    });
  }
}
