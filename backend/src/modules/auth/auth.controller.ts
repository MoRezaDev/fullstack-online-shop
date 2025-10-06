import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { Throttle } from '@nestjs/throttler';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Response } from 'express';
import { VerifyJwtGurd } from '../../common/gurds/verify-jwt.gurd';

@Throttle({ default: { ttl: 60 * 1000, limit: 3 } })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto);
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.verifyOtp(verifyOtpDto);

    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return { success: true, token };
  }

  @UseGuards(VerifyJwtGurd)
  @Get('session')
  async getUserSession(@Req() req: Request) {
    const { user_id } = req['user'];

    return await this.authService.getUserSession(user_id);
  }
}
