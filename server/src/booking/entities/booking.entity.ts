import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsEnum,
  IsMongoId,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { ShowTime } from 'src/show-times/entities/show-time.entity';
import { PaymentStatus } from 'src/Types/booking.types';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @IsMongoId()
  userId: User | mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true })
  @IsMongoId()
  movieId: Movie | mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShowTime',
    required: true,
  })
  @IsMongoId()
  showTimeId: ShowTime | mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  @IsArray()
  @IsNumber()
  @IsNotEmpty({ each: true })
  selectedSeats: number[];

  @Prop({ required: true })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @Prop()
  @IsNotEmpty()
  paypalPaymentId: string;

  @Prop({ required: true, enum: PaymentStatus })
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
