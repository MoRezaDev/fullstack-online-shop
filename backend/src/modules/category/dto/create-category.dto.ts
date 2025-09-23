import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'category name',
    example: 'mobile',
    required: true,
  })
  title: string;

  @ApiProperty({
    description: 'category name in fa',
    example: 'موبایل',
    required: true,
  })
  title_fa: string;

  @ApiProperty({
    description: 'set parentId if you need to',
    example: '3dsgdsjgbe374y3743',
    required: false,
  })
  parentId?: string;
}
