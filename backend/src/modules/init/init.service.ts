import { BadRequestException, Injectable } from '@nestjs/common';
import { InitDataDto } from './dto/init-data.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class InitService {
  constructor(private databaseService: DatabaseService) {}
  async getInitData(initDataDto: InitDataDto) {
    if (initDataDto.user_id) {
      return await this.getInitDataWithUserId(initDataDto);
    } else if (initDataDto.guest_cart_id) {
      return await this.getInitDataWithGuestCartId(initDataDto);
    } else {
      return {
        cart: null,
        user: null,
        delete_cookie_cartId: null,
      };
    }
  }

  async getInitDataWithUserId(initDataDto: InitDataDto) {
    if (initDataDto.guest_cart_id) {
      return await this.initAndMerge(initDataDto);
    }

    const user = await this.databaseService.user.findUnique({
      where: { id: initDataDto.user_id },
      include: {
        cart: { include: { cart_items: { include: { product: true } } } },
      },
    });
    if (!user) throw new BadRequestException('آیدی یوزر پیدا نشد');
    const { cart, password, email, ...rest } = user;
    return { cart, user: rest, delete_cookie_cartId: null };
  }

  async getInitDataWithGuestCartId(initDataDto: InitDataDto) {
    const cart = await this.databaseService.guestCart.findUnique({
      where: { id: initDataDto.guest_cart_id },
      include: { cart_items: { include: { product: true } } },
    });
    if (!cart) throw new BadRequestException('آیدی کارت پیدا نشد');
    return { cart, delete_cookie_cartId: null, user: null };
  }

  async initAndMerge(initDataDto: InitDataDto) {
    const [user, guestCart] = await Promise.all([
      this.databaseService.user.findUnique({
        where: { id: initDataDto.user_id },
        include: { cart: { include: { cart_items: true } } },
      }),
      this.databaseService.guestCart.findUnique({
        where: { id: initDataDto.guest_cart_id },
        include: { cart_items: true },
      }),
    ]);

    if (!user || !guestCart)
      throw new BadRequestException('اطلاعات آیدی وارد شده صحیح نیست');

    return await this.databaseService.$transaction(async (tx) => {
      for (let guestCartItem of guestCart.cart_items) {
        const foundedItem = user.cart!.cart_items.find(
          (item) => item.productId === guestCartItem.productId,
        );

        const warehouse = await tx.warehouse.findUnique({
          where: { productId: guestCartItem.productId },
        });
        if (!warehouse) throw new BadRequestException('ایدی انبار پیدا نشد');

        if (foundedItem) {
          const quantity = foundedItem.quantity + guestCartItem.quantity;
          await tx.cartItem.update({
            where: { id: foundedItem.id, productId: foundedItem.productId },
            data: {
              item_discount: warehouse.item_discount * quantity,
              selling_price:
                warehouse.item_price * quantity -
                warehouse.item_discount * quantity,
              quantity,
            },
          });
        } else {
          await tx.cartItem.create({
            data: {
              quantity: guestCartItem.quantity,
              item_price: guestCartItem.item_price,
              item_discount: guestCartItem.item_discount,
              selling_price: guestCartItem.selling_price,
              productId: guestCartItem.productId,
              cartId: user.cart!.id,
            },
          });
        }
      }

      //calculate cart final items
      const newUpdatedUserCartItems = await tx.user.findUnique({
        where: { id: user.id },
        include: { cart: { include: { cart_items: true } } },
      });

      const data = newUpdatedUserCartItems?.cart?.cart_items.reduce(
        (prev, curr) => {
          prev.items_count += curr.quantity;
          prev.selling_price += curr.selling_price;
          prev.total_discounts += curr.item_discount;
          prev.total_price += curr.item_price;
          return prev;
        },
        {
          items_count: 0,
          selling_price: 0,
          total_discounts: 0,
          total_price: 0,
        },
      );

      await tx.guestCart.delete({ where: { id: guestCart.id } });

      const result = await tx.user.update({
        where: { id: user.id },
        data: {
          cart: {
            update: {
              data: data,
            },
          },
        },
        include: {
          cart: { include: { cart_items: { include: { product: true } } } },
        },
      });
      return { user: result, delete_cookie_cartId: guestCart.id, cart: null };
    });
  }
}
