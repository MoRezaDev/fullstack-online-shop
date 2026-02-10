import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: '08-شهریور-1404' })
  delivery_date: string;

  @ApiProperty({ example: '29432owfnsdkf' })
  addressId: string;

  userId: string;

  @ApiProperty({ example: '29rhweiiffs' })
  cartId: string;
}
