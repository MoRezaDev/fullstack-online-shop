import { ApiProperty } from '@nestjs/swagger';

const apiExampleSpecifications = {
  title: 'مشخصات کلی',
  attributes: [
    {
      title: 'پردازنده',
      value: ['Qualcome 8 cores'],
    },
    {
      title: 'صفحه نمایش',
      value: ['1920 * 1080 AmoLED'],
    },
  ],
};

const apiExampleWarehouse = {
  is_free_shipping: false,
  is_free_shipping_for_plus: false,
  item_price: 1200000,
  item_discount: 0,
  quantity: 10,
  order_limit: 2,
  is_incredible: false,
  incredible_total_quantity: 0,
  incredible_selled_quantity: 0,
  incredible_sell_precentage: 0,
};
export class CreateProductDto {
  @ApiProperty({ example: '28583242398fsdf', required: true })
  categoryId: string;

  @ApiProperty({ example: '3984y29fskfsdf', required: true })
  brandId: string;

  @ApiProperty({ example: '3984y29fskfsdf', required: false })
  sellerId?: string;

  @ApiProperty({ example: [1, 2], required: true })
  colorsId: number[];

  @ApiProperty({ example: 'Samsung A56 128 RAM6' })
  title: string;

  @ApiProperty({ example: 'گوشی سامسونگ A56 128 رم 6' })
  title_fa: string;

  @ApiProperty({ example: 'یکی از بهترین گوشی های میان رده بازار' })
  description: string;

  url?: string;

  main_image_url?: string;
  images_url?: string[];

  @ApiProperty({ example: ['جزو 100 کالای برتر ماه', '+150 خرید در ماه'] })
  badges?: string[];

  @ApiProperty({ example: apiExampleSpecifications })
  specifications: typeof apiExampleSpecifications;

  @ApiProperty({ example: { title: '', value: ['', ''] } })
  main_specification: { title: string; value: string[] };

  @ApiProperty({ example: apiExampleWarehouse })
  warehouse: typeof apiExampleWarehouse;
}
