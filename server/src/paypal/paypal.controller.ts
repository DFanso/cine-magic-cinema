import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { BookingService } from 'src/booking/booking.service';
import { PaymentStatus } from 'src/Types/booking.types';
import { ShowTimesService } from 'src/show-times/show-times.service';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';
import { MoviesService } from 'src/movies/movies.service';

@ApiTags('paypal')
@Controller({ path: 'paypal', version: '1' })
export class PaypalController {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly bookingService: BookingService,
    private readonly showTimeService: ShowTimesService,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly moviesService: MoviesService,
  ) {}

  @Post('/webhook')
  async handleWebhook(@Body() body: any, @Res() res: Response) {
    console.log('Received PayPal webhook:', body);
    const bookingId = body.resource.purchase_units[0].custom_id;

    if (body.event_type === 'CHECKOUT.ORDER.APPROVED') {
      const booking = await this.bookingService.findOne({ _id: bookingId });
      const showTimeId = booking.showTimeId.toString();
      const showTime = await this.showTimeService.findById(showTimeId);
      const user = await this.usersService.findOne(booking.userId);
      const movie = await this.moviesService.findOne(booking.movieId);

      booking.paymentStatus = PaymentStatus.Paid;
      booking.paypalPaymentId = body.id;
      const newlyBookedSeats = booking.selectedSeats;

      const updateQuery = {
        $push: {
          'Seats.bookedSeats': {
            $each: newlyBookedSeats,
          },
        },
      };

      // Execute the raw MongoDB update query
      await this.showTimeService
        .getCollection()
        .updateOne({ _id: showTime._id }, updateQuery);

      await booking.save();
      await showTime.save();

      const formattedDate = this.formatShowTimeDate(showTime.date);
      const emailHtml = await this.emailService.renderTemplate(
        'booking-confirmation.hbs',
        {
          userName: user.firstName + ' ' + user.lastName,
          movieName: movie.name,
          showTime:
            formattedDate +
            ' at ' +
            showTime.startTime +
            ' - ' +
            showTime.endTime,
          seats: booking.selectedSeats,
          totalPrice: booking.totalPrice,
          movieImageUrl: movie.bannerImage,
          bookingId: bookingId,
        },
      );

      await this.emailService.sendEmail(
        [user.email],
        'Your Booking Confirmation',
        emailHtml,
      );
    }

    return res.status(HttpStatus.OK).send('Webhook received');
  }

  formatShowTimeDate(showTimeDate: Date): string {
    return showTimeDate.toDateString();
  }
}
