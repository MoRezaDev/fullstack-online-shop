import { ApiProperty } from '@nestjs/swagger';

export class RemoveCartItemDto {
  @ApiProperty({ example: '294u34rwfsd', required: true })
  cartId: string;

  @ApiProperty({ example: '294u34rwfsd', required: true })
  cartItemId: string;
}
