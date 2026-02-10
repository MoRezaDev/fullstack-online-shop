import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { VerifyJwtGurd } from '../../common/gurds/verify-jwt.gurd';
import { Request } from 'express';
import { ApiQuery } from '@nestjs/swagger';
import { PayDto } from './dto/pay.dto';

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

  @Post('pay')
  async pay(@Body() payDto: PayDto, @Req() req: Request) {
    const { user_id } = req['user'];

    return this.paymentService.pay({ ...payDto, userId: user_id });
  }
}
