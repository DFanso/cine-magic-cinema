import { ApiProperty } from '@nestjs/swagger';

export class ValidateOTPDto {
  @ApiProperty({
    description: 'The OTP code sent to the user.',
    example: '1234',
  })
  readonly code: string;
}
