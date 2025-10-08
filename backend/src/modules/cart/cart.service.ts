import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  constructor(
    private databaseService: DatabaseService,
    private productService: ProductService,
  ) {}

  async addToCartHandler(addToCartDto: AddToCartDto, user_id: string) {
    const product = await this.productService.checkProductExists(
      addToCartDto.productId,
    );

    if (!user_id) {
      return await this.addToGuestCart();
    }

    return await this.addToCart(addToCartDto,product);
  }

  async addToCart(addToCartDto: AddToCartDto,product : any ) {
    const cart = await this.checkExistsCart(addToCartDto.cartId);
    const foundedProductInCartItems = cart.cart_items.find(
      (item) => item.productId === addToCartDto.productId,
    );

    return foundedProductInCartItems
      ? await this.addQuantityToItem(addToCartDto)
      : await this.createItemToCart(addToCartDto);
  }

  async createItemToCart(addToCartDto: AddToCartDto) {
    const warehouse = await this.databaseService.warehouse.findUnique({where: {productId: addToCartDto.productId}})
    if (!warehouse) throw new BadRequestException('انبار پیدا نشد')
    return await this.databaseService.cartItem.create({
      data: {
        item_price: warehouse.item_price,
        selling_price: warehouse.item_price,
        item_discount: warehouse.item_discount || 0,
        quantity: 1,
        cartId: addToCartDto.cartId,
        productId: addToCartDto.productId
      }
    })
  }

  async addQuantityToItem(addToCartDto: AddToCartDto) {

  }

  // for guest
  async addToGuestCart() {}

  async checkExistsCart(cartId: string) {
    const cart = await this.databaseService.cart.findUnique({
      where: { id: cartId },
      include: { cart_items: true },
    });
    if (!cart) throw new BadRequestException('آیدی کارت پیدا نشد');
    return cart;
  }
}
