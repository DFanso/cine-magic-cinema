import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsArray,
  Min,
  ArrayMinSize,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

class SeatsDto {
  @IsNumber()
  @Min(0)
  @ApiProperty({
    type: Number,
    description: 'Total number of seats available',
    example: 50,
  })
  totalSeats: number;

  @IsArray()
  @ArrayMinSize(0)
  @IsNumber({}, { each: true })
  @ApiProperty({
    type: [Number],
    description: 'Array of booked seat numbers',
    example: [1, 2, 3],
  })
  bookedSeats: number[];
}

export class CreateShowTimeDto {
  @IsMongoId()
  movieId: Types.ObjectId;

  @IsDateString()
  @ApiProperty({
    type: String,
    description: 'Date of the show time in ISO format',
    example: '2023-12-15',
  })
  date: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Start time of the show in HH:mm format',
    example: '20:00',
  })
  startTime: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'End time of the show in HH:mm format',
    example: '22:00',
  })
  endTime: string;

  @ValidateNested()
  @Type(() => SeatsDto)
  @ApiProperty({
    type: SeatsDto,
    description: 'Information about the seats',
  })
  Seats: SeatsDto;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    type: Number,
    description: 'Price of the show time',
    example: 15.99,
  })
  price: number;
}
