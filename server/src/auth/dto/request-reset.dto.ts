import { ApiProperty } from '@nestjs/swagger';

export class RequestResetDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user requesting a password reset',
    required: true,
  })
  email: string;
}
