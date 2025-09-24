import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({ example: 'black' })
  title: string;

  @ApiProperty({ example: 'سیاه' })
  title_fa: string;

  @ApiProperty({ example: '#000000' })
  hex_code: string;
}
