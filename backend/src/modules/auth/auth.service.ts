import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { randomInt } from 'crypto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async sendOtp(sendOtpDto: SendOtpDto) {
    const user = await this.databaseService.user.findUnique({
      where: { mobile: sendOtpDto.mobile },
      include: { otp: true },
    });

    const otp = {
      code: randomInt(10000, 99999),
      expires_at: new Date(Date.now() + 1 * 60 * 1000),
    };

    if (!user) {
      return await this.databaseService.user.create({
        data: { mobile: sendOtpDto.mobile, otp: { create: otp } },
        select: {
          otp: true,
        },
      });
    }

    return await this.databaseService.otp.update({
      where: { id: user.otp!.id },
      data: otp,
      select: {
        code: true,
        expires_at: true,
      },
    });
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const user = await this.userService.checkUserExistsByMobile(
      verifyOtpDto.mobile,
    );

    const now = new Date();
    if (verifyOtpDto.code !== user.otp?.code) {
      throw new ForbiddenException('کد اشتباه است');
    }

    if (now > user.otp!.expires_at) {
      throw new ForbiddenException('کد شما منقضی شده');
    }

    return await this.jwtService.signAsync(
      { user_id: user.id },
      {
        expiresIn: '10m',
      },
    );
  }

  async getUserSession(userId: string) {
    const user = await this.userService.checkUserExists(userId);

    return {
      mobile: user.mobile,
      email: user.email,
      full_name: user.full_name,
    };
  }
}
