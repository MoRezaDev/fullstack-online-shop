import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: '08-شهریور-1404' })
  delivery_date: string;

  @ApiProperty({ example: 12400000 })
  total_price: number;

  @ApiProperty({ example: 400000 })
  total_discounts: number;

  @ApiProperty({ example: 1500000 })
  selling_price: number;

  @ApiProperty({ example: '29432owfnsdkf' })
  addressId: string;

  @ApiProperty({ example: '29432owfnsdkfdf' })
  userId: string;

  @ApiProperty({ example: '29rhweiiffs' })
  cartItemsId: string[];

  
}
