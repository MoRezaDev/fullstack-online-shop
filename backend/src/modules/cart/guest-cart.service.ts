import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { ProductService } from '../product/product.service';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveCartItemDto } from './dto/remove-cartItem.dto';

@Injectable()
export class GuestCartService {
  constructor(
    private databaseService: DatabaseService,
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  async addToGuestCart(addToCartDto: AddToCartDto) {
    const { cartId, productId } = addToCartDto;

    // verify cart ownership
    const cart = await this.checkExistsGuestCart(cartId);

    return this.databaseService.$transaction(async (tx) => {
      const warehouse = await tx.warehouse.findUnique({
        where: { productId },
      });
      if (!warehouse) throw new BadRequestException('انبار پیدا نشد');

      const existing = await tx.guestCartItem.findFirst({
        where: { guestCartId: cartId, productId },
      });

      if (existing) {
        // check order limit
        if (warehouse.order_limit <= existing.quantity) {
          throw new ForbiddenException('شما به حد مجاز تعداد سفارش رسیدید');
        }

        const newQuantity = existing.quantity + 1;

        const unitPrice = warehouse.item_price;
        const unitDiscount = warehouse.item_discount ?? 0;

        const totalItemPrice = unitPrice * newQuantity;
        const totalDiscount = unitDiscount * newQuantity;
        const totalSellingPrice = totalItemPrice - totalDiscount;

        return await tx.guestCart.update({
          where: { id: cart.id },
          data: {
            cart_items: {
              update: {
                where: { id: existing.id },
                data: {
                  quantity: { increment: 1 },
                  item_price: unitPrice,
                  item_discount: unitDiscount,
                  selling_price: totalSellingPrice,
                },
              },
            },
          },
          include: { cart_items: true },
        });
      } else {
        // create new item
        const unitPrice = warehouse.item_price;
        const unitDiscount = warehouse.item_discount ?? 0;
        const sellingPrice = unitPrice - unitDiscount;

        return await tx.guestCart.update({
          where: { id: cart.id },
          data: {
            cart_items: {
              create: {
                productId,
                quantity: 1,
                item_price: unitPrice,
                item_discount: unitDiscount,
                selling_price: sellingPrice,
              },
            },
          },
          include: { cart_items: true },
        });
      }
    });
  }

  async updateGuestCart(updateCartDto: AddToCartDto) {
    const { cartId, productId } = updateCartDto;
    return await this.databaseService.$transaction(async (tx) => {
      const cart = await this.checkExistsGuestCart(cartId);
      const warehouse = await tx.warehouse.findUnique({
        where: { productId },
      });
      if (!warehouse) throw new BadRequestException('انبار پیدا نشد');

      const cartItem = await this.databaseService.guestCartItem.findFirst({
        where: { guestCartId: cartId, productId },
      });
      if (!cartItem)
        throw new BadRequestException('این محصول در کارت شما وجود ندارد');

      if (cartItem.quantity <= 1)
        throw new BadRequestException(
          'حد مجاز کم کردن، لفا درخواست پاک کردن آیتم را بدهید',
        );

      const newQuantity = cartItem.quantity - 1;

      const unitPrice = warehouse.item_price;
      const unitDiscount = warehouse.item_discount ?? 0;

      const totalItemPrice = unitPrice * newQuantity;
      const totalDiscount = unitDiscount * newQuantity;
      const totalSellingPrice = totalItemPrice - totalDiscount;

      return await tx.cart.update({
        where: { id: cart.id },
        data: {
          cart_items: {
            update: {
              where: { id: cartItem.id },
              data: {
                quantity: { decrement: 1 },
                item_price: unitPrice,
                item_discount: unitDiscount,
                selling_price: totalSellingPrice,
              },
            },
          },
        },
        include: { cart_items: true },
      });
    });
  }

  async removeItemFromGuestCartItems(removeCartItemDto: RemoveCartItemDto) {
    const { cartId, cartItemId } = removeCartItemDto;
    return await this.databaseService.$transaction(async (tx) => {
      const cart = await tx.guestCart.findUnique({ where: { id: cartId } });
      if (!cart) throw new BadRequestException('آیدی کارت اشتباه است');
      const cartItem = await tx.guestCartItem.findFirst({
        where: { guestCartId: cartId, id: cartItemId },
      });
      if (!cartItem) throw new BadRequestException('آیدی آیتم اشتباه است');

      return await tx.guestCart.update({
        where: { id: cart.id },
        data: {
          cart_items: { delete: { id: cartItem.id } },
        },
        include: { cart_items: true },
      });
    });
  }

  //utility
  async checkExistsGuestCart(cartId: string) {
    const cart = await this.databaseService.guestCart.findUnique({
      where: { id: cartId },
    });
    if (!cart) throw new BadRequestException('آیدی کارت پیدا نشد');

    return cart;
  }
}
