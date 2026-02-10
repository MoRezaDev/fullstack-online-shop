import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({ example: '#aaa' })
  hex_code: string;

  @ApiProperty({ example: 'black' })
  name: string;

  @ApiProperty({ example: 'مشکی' })
  name_fa: string;
}

export class CreateColorsDto {
  @ApiProperty({
    example: [{name: '',name_fa: '',hex_code: ''}]
  })
  colors: CreateColorDto[];
}
