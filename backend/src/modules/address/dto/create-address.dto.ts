import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ example: 'مازندران', required: true })
  state: string;

  @ApiProperty({ example: 'تنکابن', required: true })
  city: string;

  @ApiProperty({ example: 'کریم آباد - کوچه ابریشم 3', required: true })
  address: string;

  @ApiProperty({ example: '-53.385', required: false })
  latitude?: string;

  @ApiProperty({ example: '43.385', required: false })
  longitude?: string;

  @ApiProperty({
    example: 'http://map.example.com/map-location.webp',
    required: false,
  })
  map_url?: string;

  @ApiProperty({ example: '3298rfsngldfsfd', required: true })
  userId: string;
}
