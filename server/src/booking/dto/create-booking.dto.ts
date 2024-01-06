import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsString,
} from 'class-validator';
import { PaymentStatus } from '../../Types/booking.types';

export class CreateBookingDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the movie',
    example: '507f1f77bcf86cd799439012',
  })
  movieId: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the show time',
    example: '507f1f77bcf86cd799439013',
  })
  showTimeId: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ApiProperty({
    type: [Number],
    description: 'Array of selected seat identifiers',
    example: [1, 2, 3],
  })
  selectedSeats: number[];

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsString()
  @IsNotEmpty()
  paypalPaymentId: string;

  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  paymentStatus: PaymentStatus;
}
