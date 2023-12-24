import { Module, forwardRef } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { PaypalController } from './paypal.controller';
import { HttpModule } from '@nestjs/axios';
import { BookingModule } from 'src/booking/booking.module';
import { ShowTimesModule } from 'src/show-times/show-times.module';
import { UsersModule } from 'src/users/users.module';
import { EmailModule } from 'src/email/email.module';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => BookingModule),
    ShowTimesModule,
    UsersModule,
    EmailModule,
    MoviesModule,
  ],
  controllers: [PaypalController],
  providers: [PaypalService],
  exports: [PaypalService],
})
export class PaypalModule {}
