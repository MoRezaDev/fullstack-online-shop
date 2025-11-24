import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({ example: '3859u395242', required: true })
  productId: string;

  @ApiProperty({ example: '3859u3952433dssg2', required: true })
  cartId: string;

  @ApiProperty({ example: '3859u3952433dssg22d', required: true })
  sellerId: string;
}
