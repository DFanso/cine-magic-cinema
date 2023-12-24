import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking, BookingDocument } from './entities/booking.entity';
import { ShowTimesService } from 'src/show-times/show-times.service';
import { PaypalService } from 'src/paypal/paypal.service';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private readonly showTimesService: ShowTimesService,
    private readonly paypalService: PaypalService,
    private readonly moviesService: MoviesService,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<any> {
    const newBooking = new this.bookingModel(createBookingDto);

    const reservationDuration = 5; // minutes
    const reservationExpires = new Date(
      new Date().getTime() + reservationDuration * 60000,
    );

    const savedBooking = await newBooking.save();
    const bookingId = savedBooking._id;

    await this.showTimesService.reserveSeatsTemporarily(
      createBookingDto.showTimeId,
      createBookingDto.selectedSeats.map(Number),
      reservationExpires,
      bookingId,
    );

    const movie = await this.moviesService.findOne({
      _id: createBookingDto.movieId,
    });
    const showTime = await this.showTimesService.findOne({
      _id: createBookingDto.showTimeId,
    });

    const approvalUrl = await this.paypalService.createOrder({
      name: movie.name,
      unit_price: showTime.price.toString(),
      quantity: createBookingDto.selectedSeats.length.toString(),
      seats: createBookingDto.selectedSeats.length,
      bookingID: bookingId.toString(),
    });

    return {
      booking: savedBooking,
      approvalUrl,
    };
  }

  async findAll(filter = {}): Promise<Booking[]> {
    const bookings = await this.bookingModel
      .find(
        filter,
        Object.keys(this.bookingModel.schema.obj)
          .map((key) => key)
          .join(' '),
      )
      .populate('userId')
      .populate('movieId')
      .exec();

    if (bookings.length === 0) {
      throw new NotFoundException('No booking found matching the criteria');
    }
    return bookings;
  }

  async findOne(filter: any): Promise<BookingDocument | null> {
    const booking = await this.bookingModel
      .findOne(
        filter,
        Object.keys(this.bookingModel.schema.obj)
          .map((key) => key)
          .join(' '),
      )
      .populate('userId')
      .populate('movieId')
      .exec();
    if (!booking) {
      throw new NotFoundException(`Booking with not found`);
    }
    return booking;
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const updatedBooking = await this.bookingModel
      .findByIdAndUpdate(id, updateBookingDto, { new: true })
      .exec();
    if (!updatedBooking) {
      throw new NotFoundException(`Booking with ID '${id}' not found`);
    }
    return updatedBooking;
  }

  async remove(id: string): Promise<void> {
    const result = await this.bookingModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Booking with ID '${id}' not found`);
    }
  }
}
