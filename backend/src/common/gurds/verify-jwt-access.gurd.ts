import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class VerifyJwtAndAccess implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    //verifying
    const token = request.cookies['token'] || request.headers['authorization'];

    const { user_id } = await this.jwtService.verifyAsync(token);
    request['user_id'] = user_id;

    return true;
  }
}
