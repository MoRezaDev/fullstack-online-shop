import { ApiProperty } from '@nestjs/swagger';

export class AddProductToSellerDto {
  @ApiProperty({ example: 'id of the seller', required: true })
  sellerId: string;

  @ApiProperty({ type: [String] })
  productsId: string[];
}
