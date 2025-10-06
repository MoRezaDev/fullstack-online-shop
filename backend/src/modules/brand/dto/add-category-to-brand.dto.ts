import { ApiProperty } from '@nestjs/swagger';

export class addCategoryToBrandDto {
  @ApiProperty({ example: '29ry9wfedf', required: true })
  brandId: string;

  @ApiProperty({ example: 'sdasd239fasds', required: true })
  categoryId: string;
}
