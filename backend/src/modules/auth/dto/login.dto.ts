import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: '09111334152', required: true })
  mobile: string;

  @ApiProperty({ example: 'example@gmail.com', required: true })
  email: string;

  @ApiProperty({ example: 'password', required: true })
  password: string;
}
