import { ApiProperty } from '@nestjs/swagger';

export class PayDto {
  @ApiProperty({ example: 438433, required: true })
  verify_code: number;

  @ApiProperty({ example: 43843377, required: true })
  transaction_code: number;

  @ApiProperty({ example: '28e20fhwefbsfw', required: true })
  orderId: string;

  @ApiProperty({ example: '28e20fhwefbsfw', required: true })
  userId: string;
}
