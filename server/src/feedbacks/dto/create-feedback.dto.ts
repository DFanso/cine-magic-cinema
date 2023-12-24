import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateFeedbackDto {
  @IsMongoId()
  userId: Types.ObjectId;

  @IsMongoId()
  @ApiProperty({
    type: String,
    description: 'MongoDB ObjectId of the movie',
    example: '507f191e810c19729de860ea',
  })
  movieId: Types.ObjectId;

  @IsNumber()
  @Min(1)
  @Max(5)
  @ApiProperty({
    type: Number,
    description: 'Rating given by the user, from 1 to 5',
    example: 4,
  })
  rating: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Comment about the movie by the user',
    example: 'Great movie, really enjoyed the special effects!',
  })
  comment: string;
}
