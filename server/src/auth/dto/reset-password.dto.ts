import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    example: '1234',
    description: 'The OTP sent to the user for password reset',
    required: true,
  })
  otp: string;

  @ApiProperty({
    example: 'newPassword123',
    description: 'The new password set by the user',
    required: true,
  })
  newPassword: string;
}
