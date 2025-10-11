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

@Injectable()
export class CartService {
  constructor(
    private databaseService: DatabaseService,
    private productService: ProductService,
  ) {}

  async addToCartHandler(addToCartDto: AddToCartDto, userId?: string) {
    // validate product exists first
    await this.productService.checkProductExists(addToCartDto.productId);

    if (!userId) {
      return this.addToGuestCart(addToCartDto);
    }

    return this.addToCartForUser(addToCartDto, userId);
  }

  async addToCartForUser(addToCartDto: AddToCartDto, userId: string) {
    const { cartId, productId } = addToCartDto;

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

        return await tx.cart.update({
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

        return await tx.cart.update({
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

  async updateCartHandler(updateCartDto: UpdateCartDto, userId?: string) {
    // validate product exists first
    await this.productService.checkProductExists(updateCartDto.productId);

    if (!userId) {
      return this.updateGuestCart(updateCartDto);
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

      return await tx.cart.update({
        where: { id: cart.id },
        data: {
          cart_items: {
            update: {
              where: { id: cartItem.id },
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
    });
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
        },
        include: { cart_items: true },
      });
    });
  }

  //for Guest
  async addToGuestCart(addToCartDto: AddToCartDto) {}

  async updateGuestCart(updateCartDto: AddToCartDto) {}

  //utility functions
  async checkExistsCart(cartId: string, userId?: string) {
    const cart = await this.databaseService.cart.findUnique({
      where: { id: cartId },
    });
    if (!cart) throw new BadRequestException('آیدی کارت پیدا نشد');

    if (userId && cart.userId !== userId) {
      throw new ForbiddenException('این کارت متعلق به کاربر دیگری است');
    }
    return cart;
  }
}
