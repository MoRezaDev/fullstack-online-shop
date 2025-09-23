import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ example: 'Samsung' })
  title: string;

  @ApiProperty({ example: 'سامسونگ' })
  title_fa: string;

  @ApiProperty({ example: 'explain the what is the brand' })
  description: string;

  @ApiProperty({
    example: 'if the brand is samsung, put the mobile category id',
  })
  categoryId: string;
}
