import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsEmail } from 'class-validator';
import { UserType, UserStatus } from '../../Types/user.types';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
    minLength: 6,
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  email: string;

  @IsEnum(UserType)
  type: UserType = UserType.Customer;

  @IsEnum(UserStatus)
  status: UserStatus = UserStatus.Unverified;
}
