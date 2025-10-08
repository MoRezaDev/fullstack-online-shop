import { ApiProperty } from '@nestjs/swagger';

export class CreateSellerDto {
  @ApiProperty({ example: 'sky electrics' })
  title: string;

  @ApiProperty({ example: 'اسکای الکتریک' })
  title_fa: string;
}
