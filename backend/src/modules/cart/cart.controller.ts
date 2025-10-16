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
import { GuestCartService } from './guest-cart.service';

@UseGuards(VerifyJwtAndAccess)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService, private readonly guestCartService: GuestCartService) {}

  @Post('add')
  async addToCart(
    @Body() addTocartDto: AddToCartDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const userId = req['user_id'];
    const guestCartCookieId = req.cookies['guest_cart_id'];
    const { guest_cart_id, result } = await this.cartService.addToCartHandler(
      addTocartDto,
      userId,
      guestCartCookieId,
    );
    if (guest_cart_id)
      res.cookie('guest_cart_id', guest_cart_id, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'none',
        httpOnly: true,
      });
    return result;
  }

  @Post('update')
  async updateCart(@Body() updateCartDto: UpdateCartDto, @Req() req: Request) {
    const userId = req['user_id'];
    const guestCartCookieId = req.cookies['guest_cart_id'];
    return this.cartService.updateCartHandler(
      updateCartDto,
      userId,
      guestCartCookieId,
    );
  }

  @Delete('remove-item')
  async removeItem(
    @Body() removeCartItemDto: RemoveCartItemDto,
    @Req() req: Request,
  ) {
    const userId = req['user_id'];
    const guestCartCookieId = req.cookies['guest_cart_id'];

    return this.cartService.removeItemFromCartHandler(
      removeCartItemDto,
      userId,
      guestCartCookieId,
    );
  }

  @Delete('clear-cart')
  async clearUserCart(@Body() clearUserCartDto: ClearCartDto) {
    return this.cartService.clearUserCart(clearUserCartDto);
  }

  @Delete('clear-guest-cart')
  async clearGuestCart(@Body() clearUserCartDto: ClearCartDto) {
    return this.guestCartService.clearGuestCart(clearUserCartDto);
  }
}
