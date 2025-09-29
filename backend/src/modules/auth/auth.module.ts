import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      global: true,
      privateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1m' },
    }),
  ],
})
export class AuthModule {}
