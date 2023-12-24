import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Movie } from 'src/movies/entities/movie.entity';

export type ShowTimeDocument = ShowTime & Document;

@Schema()
export class ShowTime {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true })
  movieId: Movie | mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endTime: string;

  @Prop({
    required: true,
    type: Object,
    properties: {
      totalSeats: { type: Number, required: true },
      bookedSeats: { type: [Number], required: true },
    },
  })
  Seats: {
    totalSeats: number;
    bookedSeats: number[];
  };

  @Prop({ required: true })
  price: number;

  @Prop({
    type: [
      {
        seatNumber: Number,
        reservedUntil: Date, // This field will be used for TTL
        bookingId: mongoose.Schema.Types.ObjectId,
      },
    ],
    default: [],
  })
  temporaryReservations: {
    reservationExpires: Date;
    seatNumber: number;
    reservedUntil: Date; // This Date field should hold the time when the reservation should expire
    bookingId: mongoose.Schema.Types.ObjectId;
  }[];

  @Prop({
    required: false,
    type: Date,
    expires: 0,
  })
  expireAt: Date;
}

const ShowTimeSchema = SchemaFactory.createForClass(ShowTime);

ShowTimeSchema.pre('save', function (next) {
  // Assuming startTime is stored in 'HH:mm' format
  const [hours, minutes] = this.startTime.split(':').map(Number);
  const expirationDate = new Date(this.date);
  expirationDate.setHours(hours, minutes, 0, 0); // Set the time to the startTime value

  this.expireAt = expirationDate; // Set the expireAt field

  next();
});

export { ShowTimeSchema };
