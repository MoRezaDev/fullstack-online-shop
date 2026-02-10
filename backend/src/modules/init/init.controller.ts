import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { InitService } from './init.service';
import { Request, Response } from 'express';
import { VerifyJwtAndAccess } from '../../common/gurds/verify-jwt-access.gurd';

@UseGuards(VerifyJwtAndAccess)
@Controller('init')
export class InitController {
  constructor(private readonly initService: InitService) {}

  @Get()
  async getInitData(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user_id = req['user_id'];
    const guest_cart_id = req.cookies['guest_cart_id'];
    const data = await this.initService.getInitData({ user_id, guest_cart_id });
    if (data.delete_cookie_cartId) {
      res.clearCookie('guest_cart_id');
      const { delete_cookie_cartId, ...rest } = data;
      return rest;
    }

    const { delete_cookie_cartId, ...rest } = data;
    return rest;
  }
}
