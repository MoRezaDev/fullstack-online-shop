import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'محصول خوبی بود لذت بردم', required: true })
  body: string;

  @ApiProperty({ example: 'sfsd37fsdkfdssad', required: true })
  userId: string;

  @ApiProperty({ example: 'sfsd37fsdkfdssad', required: true })
  productId: string;

  @ApiProperty({ type: [String], example: ['مجهز به فلان', 'بسیار مقاوم'] })
  advantages: string[];

  @ApiProperty({ type: [String], example: ['بدنه آسیب پذیر', 'نگهداری مشکل'] })
  disadvantages: string[];

  created_at? : string

  is_buyer?: string

  rate? : number

  is_approved? : boolean


}
