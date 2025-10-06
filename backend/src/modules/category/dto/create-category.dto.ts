import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'electronics',required: true })
  title: string;

  @ApiProperty({ example: 'الکترونیک',required: true })
  title_fa: string;

  @ApiProperty({ example: '75835834fsd' })
  parentId?: string;
}
