import { Controller, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { VerifyJwtAndAccess } from '../../common/gurds/verify-jwt-access.gurd';

@UseGuards(VerifyJwtAndAccess)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart() {}
}
