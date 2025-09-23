import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('فروشگاه آنلاین')
  .setDescription('بک اند و اندپوینت های فروشگاه آنلاین')
  .setVersion('1.0')
  .build();
