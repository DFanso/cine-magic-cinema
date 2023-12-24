import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import * as mongoose from 'mongoose';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';
export type FeedbackDocument = Feedback & Document;

@Schema()
export class Feedback {
  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User | mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' })
  movieId: Movie | mongoose.Schema.Types.ObjectId;

  @IsNumber()
  @Min(1)
  @Max(5)
  @Prop()
  rating: number;

  @IsString()
  @Prop()
  comment: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
