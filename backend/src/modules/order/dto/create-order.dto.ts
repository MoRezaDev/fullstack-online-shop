import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: '383373sfdsf', required: true })
  userId: string;

  @ApiProperty({ example: '383373sfdsf', required: true })
  addressId: string;
}
