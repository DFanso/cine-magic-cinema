import { Module, forwardRef } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking, BookingSchema } from './entities/booking.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { MoviesModule } from 'src/movies/movies.module';
import { ShowTimesModule } from 'src/show-times/show-times.module';
import { ClsModule } from 'nestjs-cls';
import { PaypalModule } from 'src/paypal/paypal.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    UsersModule,
    MoviesModule,
    ShowTimesModule,
    ClsModule,
    forwardRef(() => PaypalModule),
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
