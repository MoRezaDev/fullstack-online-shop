import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ example: 'samsung' })
  title: string;

  @ApiProperty({ example: 'سامسونگ' })
  title_fa: string;
}
