import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { VerifyJwtGurd } from '../../common/gurds/verify-jwt.gurd';
import { CreateOrderDto } from './dto/create-order.dto';
import { Request } from 'express';

@UseGuards(VerifyJwtGurd)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async createOrder(createOrderDto: CreateOrderDto, @Req() req: Request) {
    const userId = req['user_id'];
    const newCreateOrderDto = { ...createOrderDto, userId };
    return this.orderService.createOrder(newCreateOrderDto);
  }
}
