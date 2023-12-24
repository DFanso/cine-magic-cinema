import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContactFormDto {
  @ApiProperty({
    description: 'Name of the person filling out the form',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email address of the person',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Mobile number of the person',
    example: '+1234567890',
    required: false, // if the mobile number is optional
  })
  @IsPhoneNumber()
  @IsOptional()
  mobileNumber?: string;

  @ApiProperty({
    description: 'Message content from the contact form',
    example: 'I would like more information about your services.',
  })
  @IsString()
  @IsOptional()
  message?: string;
}
