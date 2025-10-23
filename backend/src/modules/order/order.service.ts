import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserService } from '../user/user.service';
import { randomInt } from 'crypto';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
    private readonly cartService: CartService,
  ) {}

  async createOrder(CreateOrderDto: CreateOrderDto) {
    await this.userService.checkUserExists(CreateOrderDto.userId);

    return await this.databaseService.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { id: CreateOrderDto.cartId },
        include: { cart_items: true },
      });

      if (!cart || !cart.cart_items.length)
        throw new BadRequestException(
          'آیدی کارت اشتباه است یا آیتمی در کارت وجود ندارد',
        );

      const updated = await tx.order.create({
        data: {
          userId: CreateOrderDto.userId,
          addressId: CreateOrderDto.addressId,
          delivery_date: CreateOrderDto.delivery_date,
          order_number: randomInt(2000000, 3999999),
          order_date: new Date().toLocaleDateString('fa-IR', {
            weekday: 'long',
          }),
          selling_price: cart.selling_price,
          total_discounts: cart.total_discounts,
          total_price: cart.total_price,
          payment_details: {
            create: {
              price: cart.selling_price,
              verify_code: randomInt(40000, 49999),
            },
          },
          order_items: {
            createMany: {
              data: cart.cart_items.map((item) => ({
                item_discount: item.item_discount,
                item_price: item.item_price,
                productId: item.productId,
                quantity: item.quantity,
                selling_price: item.selling_price,
                total_discounts: item.item_discount * item.quantity,
                total_price: item.item_price * item.quantity,
              })),
            },
          },
        },
      });
      await this.cartService.clearUserCart({ cartId: cart.id });
      return updated;
    });
  }

  async removeAll(userId: string) {
    return await this.databaseService.order.deleteMany({ where: { userId } });
  }
}
