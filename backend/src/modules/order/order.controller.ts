import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { VerifyJwtGurd } from '../../common/gurds/verify-jwt.gurd';
import { CreateOrderDto } from './dto/create-order.dto';
import { Request, Response } from 'express';

@UseGuards(VerifyJwtGurd)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { user_id } = req['user'];
    console.log(user_id);
    const newCreateOrderDto = { ...createOrderDto, userId: user_id };
    const data = await this.orderService.createOrder(newCreateOrderDto);
    return res.redirect(`/pay?id=${data.id}`);
  }

  @Delete('remove-all')
  async removeAll(@Req() req: Request) {
    const { user_id } = req['user'];
    return this.orderService.removeAll(user_id);
  }
}
