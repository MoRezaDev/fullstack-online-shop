import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { VerifyJwtGurd } from '../../common/gurds/verify-jwt.gurd';
import { Request } from 'express';
import { ApiQuery } from '@nestjs/swagger';

@UseGuards(VerifyJwtGurd)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiQuery({ name: 'id', description: 'put the orderId here' })
  @Get('pay')
  async checkUserNotPaid(@Query('id') id: string, @Req() req: Request) {
    const { user_id } = req['user'];
    return this.paymentService.checkUserNotPaid({
      orderId: id,
      userId: user_id,
    });
  }
}
