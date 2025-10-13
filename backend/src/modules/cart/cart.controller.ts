import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { VerifyJwtAndAccess } from '../../common/gurds/verify-jwt-access.gurd';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { RemoveCartItemDto } from './dto/remove-cartItem.dto';
import { Request, Response } from 'express';
import { ClearCartDto } from './dto/clear-cart.dto';

@UseGuards(VerifyJwtAndAccess)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(
    @Body() addTocartDto: AddToCartDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user_id'];
    const { guest_cart_id, result } = await this.cartService.addToCartHandler(
      addTocartDto,
      userId,
    );
    if (guest_cart_id) res.cookie('guest_cart_id', guest_cart_id);
    return result;
  }

  @Post('update')
  async updateCart(@Body() updateCartDto: UpdateCartDto, @Req() req: Request) {
    const userId = req['user_id'];
    return this.cartService.updateCartHandler(updateCartDto, userId);
  }

  @Delete('remove-item')
  async removeItem(
    @Body() removeCartItemDto: RemoveCartItemDto,
    @Req() req: Request,
  ) {
    const userId = req['user_id'];
    return this.cartService.removeItemFromCartHandler(
      removeCartItemDto,
      userId,
    );
  }

  @Delete('clear-cart')
  async clearUserCart(@Body() clearUserCartDto: ClearCartDto) {
    return this.cartService.clearUserCart(clearUserCartDto);
  }
}
