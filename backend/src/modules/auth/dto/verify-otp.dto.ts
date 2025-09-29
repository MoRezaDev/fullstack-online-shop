import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({ example: 12345, required: true })
  code: number;

  @ApiProperty({ example: '09111923456', required: true })
  mobile: string;
}
