import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestOTPDto {
  @ApiProperty({
    description: 'Enter your email',
    example: 'example@mail.com',
  })
  @IsEmail()
  readonly Email: string;
}
