import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserService } from '../user/user.service';
import { randomInt } from 'crypto';

@Injectable()
export class OrderService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
  ) {}

  async createOrder(CreateOrderDto: CreateOrderDto) {
    const user = await this.userService.checkUserExists(CreateOrderDto.userId);

    return await this.databaseService.$transaction(async (tx) => {
      const orderItems = await tx.cartItem.findMany({
        where: { id: { in: CreateOrderDto.cartItemsId } },
      });
      if (!orderItems.length)
        throw new BadRequestException('مشکل در دریافت اطلاعات سفارش');

      return await tx.order.create({
        data: {
          userId: CreateOrderDto.userId,
          addressId: CreateOrderDto.addressId,
          delivery_date: CreateOrderDto.delivery_date,
          order_number: randomInt(2000000, 3999999),
          order_date: new Date().toLocaleDateString('fa-IR',{}),
        },
      });
    });
  }
}
