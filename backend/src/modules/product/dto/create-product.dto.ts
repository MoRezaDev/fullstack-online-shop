import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Samsung A56', required: true })
  name: string;

  @ApiProperty({ example: 'سامسونگ A56 گوشی بسیار عالی', required: true })
  description: string;

  @ApiProperty({
    example:
      'اگر لینک عکس دارید اینجا وارد کنید، در غیر این صورت این فیلد را پاک کنید',
  })
  images?: string[];

  @ApiProperty({ example: 'آدرس عکس اصلی' })
  main_image: string;

  @ApiProperty({ example: 'Name of the product' })
  category_brand_url?: string;

  @ApiProperty({ example: 'نام محصول به فارسی' })
  title: string;

  @ApiProperty({ example: 'آیدی دسته مورد نظر', required: true })
  categoryId: string;

  @ApiProperty({ example: 'آیدی برند مورد نظر', required: true })
  brandId: string;

  rate?: number;

  @ApiProperty({ example: 'آیدی های رنگ های مورد نظر', required: true })
  colorsId: number[];

  @ApiProperty({ example: 'آیدی فروشنده مورد نظر در صورت نیاز' })
  sellerId?: string;

  @ApiProperty({ example: [{ title: '', values: ['', ''] }] })
  main_specs: object[];

  @ApiProperty({
    example: [{ title: '', attributes: [{ title: '', values: ['', ''] }] }],
  })
  specifications: object[];
}
