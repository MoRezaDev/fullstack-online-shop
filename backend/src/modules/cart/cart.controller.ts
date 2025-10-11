import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { VerifyJwtAndAccess } from '../../common/gurds/verify-jwt-access.gurd';
import { AddToCartDto } from './dto/add-to-cart.dto';

@UseGuards(VerifyJwtAndAccess)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() addTocartDto: AddToCartDto) {
    return this.cartService.addToCartHandler(addTocartDto);
  }

  
}
