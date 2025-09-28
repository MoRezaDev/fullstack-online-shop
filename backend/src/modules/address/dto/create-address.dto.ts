import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ example: '74r73wfsdfdsg73', required: true })
  userId: string;


  @ApiProperty({ example: 'تنکابن', required: true })
  city: string;

  @ApiProperty({ example: 'مازندران', required: true })
  state: string;

  @ApiProperty({
    example: 'خیابان شهید رجایی - کوچه 24 پلاک12',
    required: true,
  })
  address: string;

  @ApiProperty({ example: '4681965887', required: false })
  zip_code: string;

  @ApiProperty({ example: '40.7128', required: false })
  latitude: string;

  @ApiProperty({ example: '-74.0060', required: false })
  longitude: string;

  @ApiProperty({
    type: [String],
    example: ['http://test.co/map_img1.png', 'http://test.co/map_img2.png'],
  })
  map_images: string[];
}
