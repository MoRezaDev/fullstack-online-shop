import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DatabaseService } from '../../database/database.service';
import { UserService } from '../../modules/user/user.service';

@Injectable()
export class VerifyRoleGurd implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userServices: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: string[] = this.reflector.get('roles', context.getHandler());

    const request = context.switchToHttp().getRequest();
    const { user_id } = request['user'];
    const user = await this.userServices.checkUserExists(user_id);

    if (!roles.includes(user.role)) {
      throw new UnauthorizedException('شما اجازه دسترسی ندارید!');
    }

    return true;
  }
}
