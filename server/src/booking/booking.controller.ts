import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaymentStatus } from 'src/Types/booking.types';
import { ClsService } from 'nestjs-cls';
import { AppClsStore } from 'src/Types/user.types';
import { UsersService } from 'src/users/users.service';
import { MoviesService } from 'src/movies/movies.service';
import { ShowTimesService } from 'src/show-times/show-times.service';
import { AuthGuard } from '@nestjs/passport';
import mongoose from 'mongoose';

@ApiTags('booking')
@Controller({ path: 'booking', version: '1' })
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly usersService: UsersService,
    private readonly moviesService: MoviesService,
    private readonly showTimesService: ShowTimesService,
    private readonly clsService: ClsService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The booking has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  async create(@Body() createBookingDto: CreateBookingDto) {
    const context = this.clsService.get<AppClsStore>();
    if (!context || !context.user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersService.findOne({ _id: context.user.id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    createBookingDto.userId = context.user.id;

    const movie = await this.moviesService.findOne({
      _id: createBookingDto.movieId,
    });
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.BAD_REQUEST);
    }
    const showTime = await this.showTimesService.findOne({
      _id: createBookingDto.showTimeId,
    });
    if (!showTime) {
      throw new HttpException('Show time not found', HttpStatus.BAD_REQUEST);
    }

    const seatsAreBooked = showTime.Seats.bookedSeats.some((bookedSeat) =>
      createBookingDto.selectedSeats.includes(bookedSeat),
    );
    const seatsAreTemporarilyHeld = showTime.temporaryReservations.some(
      (tempSeat) =>
        createBookingDto.selectedSeats.includes(tempSeat.seatNumber),
    );
    if (seatsAreBooked || seatsAreTemporarilyHeld) {
      throw new HttpException(
        'One or more selected seats are already booked or temporarily held',
        HttpStatus.BAD_REQUEST,
      );
    }

    const numberOfSeats = createBookingDto.selectedSeats.length;
    const pricePerSeat = showTime.price;
    const totalPrice = numberOfSeats * pricePerSeat;
    createBookingDto.totalPrice = totalPrice;
    createBookingDto.paymentStatus = PaymentStatus.Unpaid;
    return this.bookingService.create(createBookingDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/user')
  @ApiOperation({ summary: 'Get bookings for the authenticated user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Bookings found' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No bookings found for the user',
  })
  async findByUser() {
    const context = this.clsService.get<AppClsStore>();
    if (!context || !context.user) {
      throw new HttpException(
        'Authentication required',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const bookings = await this.bookingService.findAllForUser({
      userId: context.user.id,
      paymentStatus: 'PAID',
    });

    if (bookings.length === 0) {
      throw new NotFoundException('No bookings found for the user');
    }

    return bookings;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/movie/:id')
  @ApiOperation({ summary: 'Get bookings for the authenticated user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Bookings found' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No bookings found for the user',
  })
  async findByMovie(@Param('id') id: string) {
    const context = this.clsService.get<AppClsStore>();
    if (!context || !context.user) {
      throw new HttpException(
        'Authentication required',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const bookings = await this.bookingService.findAll({
      movieId: id,
    });

    if (bookings.length === 0) {
      throw new NotFoundException('No bookings found for the Movie');
    }

    return bookings;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({ status: HttpStatus.OK, description: 'All bookings returned' })
  findAll() {
    return this.bookingService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Booking found' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Booking not found',
  })
  findOne(@Param('id') id: string) {
    const bookingID = new mongoose.Types.ObjectId(id);
    return this.bookingService.findOne({ _id: bookingID });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOperation({ summary: 'Update a booking' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Booking updated' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Booking not found',
  })
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Booking deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Booking not found',
  })
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
