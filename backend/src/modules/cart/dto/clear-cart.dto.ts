import { ApiProperty } from '@nestjs/swagger';

export class ClearCartDto {
  @ApiProperty({ example: 'r83924242', required: true })
  cartId: string;
}
