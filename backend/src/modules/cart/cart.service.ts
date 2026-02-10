import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductService } from '../product/product.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { RemoveCartItemDto } from './dto/remove-cartItem.dto';
import { ClearCartDto } from './dto/clear-cart.dto';
import { GuestCartService } from './guest-cart.service';

@Injectable()
export class CartService {
  constructor(
    private databaseService: DatabaseService,
    private productService: ProductService,
    private guestCartService: GuestCartService,
  ) {}

  async addToCartHandler(
    addToCartDto: AddToCartDto,
    userId?: string,
    guestCartCookieId?: string,
  ) {
    // validate product exists first
    await this.productService.checkProductExists(addToCartDto.productId);

    if (!userId) {
      const result = await this.guestCartService.addToGuestCart(
        addToCartDto,
        guestCartCookieId,
      );
      return { result, guest_cart_id: result.id };
    }

    const result = await this.addToCartForUser(addToCartDto, userId);
    return { result, guest_cart_id: null };
  }

  async addToCartForUser(addToCartDto: AddToCartDto, userId: string) {
    const { cartId, productId, sellerId } = addToCartDto;

    // verify cart ownership
    const cart = await this.checkExistsCart(cartId, userId);

    return this.databaseService.$transaction(async (tx) => {
      const warehouse = await tx.warehouse.findUnique({
        where: { productId },
      });
      if (!warehouse) throw new BadRequestException('انبار پیدا نشد');

      const existing = await tx.cartItem.findFirst({
        where: { cartId, productId },
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

        const updatedCart = await tx.cart.update({
          where: { id: cart.id },
          data: {
            cart_items: {
              update: {
                where: { id: existing.id },
                data: {
                  quantity: { increment: 1 },
                  item_price: unitPrice,
                  item_discount: totalDiscount,
                  selling_price: totalSellingPrice,
                },
              },
            },
          },
          include: { cart_items: true },
        });

        const { cartDiscounts, cartSellingPrice, cartTotalPrice } =
          this.calculateCartTotals(updatedCart.cart_items);

        return await tx.cart.update({
          where: { id: updatedCart.id },
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

        const updatedCart = await tx.cart.update({
          where: { id: cart.id },
          data: {
            cart_items: {
              create: {
                productId,
                quantity: 1,
                item_price: unitPrice,
                item_discount: unitDiscount,
                selling_price: sellingPrice,
                sellerId,
              },
            },
          },
          include: { cart_items: true },
        });

        const { cartDiscounts, cartSellingPrice, cartTotalPrice } =
          this.calculateCartTotals(updatedCart.cart_items);

        return await tx.cart.update({
          where: { id: updatedCart.id },
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

  async updateCartHandler(
    updateCartDto: UpdateCartDto,
    userId?: string,
    guestCartCookieId?: string,
  ) {
    // validate product exists first
    await this.productService.checkProductExists(updateCartDto.productId);

    if (!userId) {
      return this.guestCartService.updateGuestCart(
        updateCartDto,
        guestCartCookieId,
      );
    }

    return this.updateCartToUser(updateCartDto);
  }

  async updateCartToUser(updateCartDto: UpdateCartDto) {
    const { cartId, productId } = updateCartDto;
    return await this.databaseService.$transaction(async (tx) => {
      const cart = await this.checkExistsCart(cartId);
      const warehouse = await tx.warehouse.findUnique({
        where: { productId },
      });
      if (!warehouse) throw new BadRequestException('انبار پیدا نشد');

      const cartItem = await this.databaseService.cartItem.findFirst({
        where: { cartId, productId },
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

      const updatedCart = await tx.cart.update({
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
        this.calculateCartTotals(updatedCart.cart_items);

      return await tx.cart.update({
        where: { id: updatedCart.id },
        data: {
          items_count: { decrement: 1 },
          selling_price: cartSellingPrice,
          total_discounts: cartDiscounts,
          total_price: cartTotalPrice,
        },
        include: { cart_items: true },
      });
    });
  }

  async removeItemFromCartHandler(
    removeCartItemDto: RemoveCartItemDto,
    userId?: string,
    guestCartCookieId?: string,
  ) {
    if (!userId) {
      return this.guestCartService.removeItemFromGuestCartItems(
        removeCartItemDto,
        guestCartCookieId,
      );
    }

    return this.removeItemFromCartItems(removeCartItemDto);
  }

  async removeItemFromCartItems(removeCartItemDto: RemoveCartItemDto) {
    const { cartId, cartItemId } = removeCartItemDto;
    return await this.databaseService.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({ where: { id: cartId } });
      if (!cart) throw new BadRequestException('آیدی کارت اشتباه است');
      const cartItem = await tx.cartItem.findFirst({
        where: { cartId: cartId, id: cartItemId },
      });
      if (!cartItem) throw new BadRequestException('آیدی آیتم اشتباه است');

      return await tx.cart.update({
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

  //utility functions
  async checkExistsCart(cartId: string, userId?: string) {
    const cart = await this.databaseService.cart.findUnique({
      where: { id: cartId },
      include: { cart_items: true },
    });
    if (!cart) throw new BadRequestException('آیدی کارت پیدا نشد');

    if (userId && cart.userId !== userId) {
      throw new ForbiddenException('این کارت متعلق به کاربر دیگری است');
    }
    return cart;
  }

  async clearUserCart(clearCartDto: ClearCartDto) {
    await this.checkExistsCart(clearCartDto.cartId);
    return await this.databaseService.$transaction(async (tx) => {
      await tx.cartItem.deleteMany({
        where: { cartId: clearCartDto.cartId },
      });
      return await tx.cart.update({
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

  calculateCartTotals(
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
