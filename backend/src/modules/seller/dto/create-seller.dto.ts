import { ApiProperty } from '@nestjs/swagger';

export class CreateSellerDto {
  @ApiProperty({ example: 'Sky electrics', description: "The seller's name" })
  title: string;

  @ApiProperty({
    example: 'اسکای الکتریک',
    description: "The seller's name in persian",
  })
  title_fa: string;

  @ApiProperty({ example: 'handle by backend, leave this', required: false })
  url?: string;

  @ApiProperty({ example: 'handle by backend, leave this', required: false })
  stars?: number;

  @ApiProperty({ example: 'handle by backend, leave this', required: false })
  grade?: object;

  @ApiProperty({ example: 'handle by backend, leave this', required: false })
  properties?: object;

  @ApiProperty({ example: 'handle by backend, leave this', required: false })
  productIds?: string[];
}
