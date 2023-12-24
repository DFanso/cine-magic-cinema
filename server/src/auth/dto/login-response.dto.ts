import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ description: 'The id token.' })
  id_token: string;

  @ApiProperty({ description: 'The expires in.' })
  expires_in: string;

  @ApiProperty({ description: 'The token type.', default: 'Bearer' })
  token_type: string;

  @ApiProperty({ description: 'The User Object.', type: 'object' })
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}
