import { ApiProperty } from '@nestjs/swagger';

export class SubmitCommentDto {
  @ApiProperty({ example: '295u3wfkfmdslfsdf' })
  userId: string;

  @ApiProperty({ example: '295u3wfkfmdslfsdf' })
  productId: string;

  @ApiProperty({ example: 'خیلی خوب بود' })
  text: string;

  rate?: number;
}
