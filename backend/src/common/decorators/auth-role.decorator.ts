import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { VerifyJwtGurd } from '../gurds/verify-jwt.gurd';
import { VerifyRoleGurd } from '../gurds/verify-role.gurd';

export function VerifyJwtAndRole(...roles: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(VerifyJwtGurd, VerifyRoleGurd),
  );
}
