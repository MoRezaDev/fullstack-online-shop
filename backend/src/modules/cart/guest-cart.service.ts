import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveCartItemDto } from './dto/remove-cartItem.dto';
import { ClearCartDto } from './dto/clear-cart.dto';

@Injectable()
export class GuestCartService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addToGuestCart(addToCartDto: AddToCartDto, guestCartCookieId?: string) {
    const { productId } = addToCartDto;

    return this.databaseService.$transaction(async (tx) => {
      let cart: any;
      if (!guestCartCookieId) {
        cart = await tx.guestCart.create({ data: {} });
      }
      const warehouse = await tx.warehouse.findUnique({
        where: { productId },
      });
      if (!warehouse) throw new BadRequestException('انبار پیدا نشد');

      const existing = await tx.guestCartItem.findFirst({
        where: { guestCartId: guestCartCookieId, productId },
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

        const updatedGuestCart = await tx.guestCart.update({
          where: { id: guestCartCookieId },
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

        const { cartDiscounts, cartSellingPrice, cartTotalPrice } =
          this.calculateGuestCartTotals(updatedGuestCart.cart_items);

        return await tx.guestCart.update({
          where: { id: updatedGuestCart.id },
          data: {
            items_count: { increment: 1 },
            selling_price: cartSellingPrice,
            total_discounts: cartDiscounts,
            total_price: cartTotalPrice,
          },
          include: { cart_items: true },
        });
      } else {
        // create new item
        const unitPrice = warehouse.item_price;
        const unitDiscount = warehouse.item_discount ?? 0;
        const sellingPrice = unitPrice - unitDiscount;

        const updatedGuestCart = await tx.guestCart.update({
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

        const { cartDiscounts, cartSellingPrice, cartTotalPrice } =
          this.calculateGuestCartTotals(updatedGuestCart.cart_items);

        return await tx.guestCart.update({
          where: { id: updatedGuestCart.id },
          data: {
            items_count: { increment: 1 },
            selling_price: cartSellingPrice,
            total_discounts: cartDiscounts,
            total_price: cartTotalPrice,
          },
          include: { cart_items: true },
        });
      }
    });
  }

  async updateGuestCart(
    updateCartDto: AddToCartDto,
    guestCartCookieId?: string,
  ) {
    const { productId } = updateCartDto;
    return await this.databaseService.$transaction(async (tx) => {
      if (!guestCartCookieId)
        throw new BadRequestException('آیدی کارت مهمان نامعتبر');
      const cart = await this.checkExistsGuestCart(guestCartCookieId);
      const warehouse = await tx.warehouse.findUnique({
        where: { productId },
      });
      if (!warehouse) throw new BadRequestException('انبار پیدا نشد');

      const cartItem = await this.databaseService.guestCartItem.findFirst({
        where: { guestCartId: cart.id, productId },
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

      const updatedGuestCart = await tx.guestCart.update({
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

      const { cartDiscounts, cartSellingPrice, cartTotalPrice } =
        this.calculateGuestCartTotals(updatedGuestCart.cart_items);
      return await tx.guestCart.update({
        where: { id: cart.id },
        data: {
          items_count: { decrement: 1 },
          selling_price: cartSellingPrice,
          total_discounts: cartDiscounts,
          total_price: cartTotalPrice,
        },
      });
    });
  }

  async removeItemFromGuestCartItems(
    removeCartItemDto: RemoveCartItemDto,
    guestCartCookieId?: string,
  ) {
    const { cartId, cartItemId } = removeCartItemDto;
    return await this.databaseService.$transaction(async (tx) => {
      if (!guestCartCookieId)
        throw new BadRequestException('آیدی کارت مهمان نامعتبر');
      const cart = await this.checkExistsGuestCart(guestCartCookieId);
      const cartItem = await tx.guestCartItem.findFirst({
        where: { guestCartId: cartId, id: cartItemId },
      });
      if (!cartItem) throw new BadRequestException('آیدی آیتم اشتباه است');

      return await tx.guestCart.update({
        where: { id: cart.id },
        data: {
          cart_items: { delete: { id: cartItem.id } },
          items_count: { decrement: 1 },
          selling_price: cart.selling_price - cartItem.selling_price,
          total_discounts: cart.total_discounts - cartItem.item_discount,
          total_price: cart.total_price - cartItem.item_price,
        },
        include: { cart_items: true },
      });
    });
  }

  async clearGuestCart(clearCartDto: ClearCartDto) {
    await this.checkExistsGuestCart(clearCartDto.cartId);
    return await this.databaseService.$transaction(async (tx) => {
      await tx.guestCartItem.deleteMany({
        where: { guestCartId: clearCartDto.cartId },
      });
      return await tx.guestCart.update({
        where: { id: clearCartDto.cartId },
        data: {
          items_count: 0,
          selling_price: 0,
          total_discounts: 0,
          total_price: 0,
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
    if (!cart) throw new BadRequestException('آیدی کارت مهمان پیدا نشد');

    return cart;
  }

  calculateGuestCartTotals(
    items: {
      item_price: number;
      item_discount: number;
      selling_price: number;
      quantity: number;
    }[],
  ) {
    const totalDiscounts = items.reduce(
      (prev, curr) => prev + curr.item_discount,
      0,
    );
    const totalSellingPrice = items.reduce(
      (prev, curr) => prev + curr.selling_price,
      0,
    );

    const totalPrice = items.reduce(
      (prev, curr) => prev + curr.item_price * curr.quantity,
      0,
    );

    return {
      cartDiscounts: totalDiscounts,
      cartSellingPrice: totalSellingPrice,
      cartTotalPrice: totalPrice,
    };
  }
}
