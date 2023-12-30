import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { ShowTimesService } from '../show-times/show-times.service';
import { PaypalService } from '../paypal/paypal.service';
import { MoviesService } from '../movies/movies.service';
import { Types } from 'mongoose';
import { PaymentStatus } from '../Types/booking.types';
import { getModelToken } from '@nestjs/mongoose';
import { Booking } from './entities/booking.entity';
import { NotFoundException } from '@nestjs/common';

describe('BookingService', () => {
  let service: BookingService;

  const mockBooking = {
    _id: new Types.ObjectId(),
    userId: new Types.ObjectId(),
    movieId: 'someMovieId',
    showTimeId: 'someShowTimeId',
    selectedSeats: [4, 5, 6],
    totalPrice: 30,
    paypalPaymentId: 'paypal123',
    paymentStatus: PaymentStatus.Paid,
  };

  beforeEach(async () => {
    const mockBookingModel = jest.fn().mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockBooking),
      find: jest.fn().mockResolvedValue([mockBooking]),
      findOne: jest.fn().mockResolvedValue(mockBooking),
      findByIdAndUpdate: jest.fn().mockResolvedValue(mockBooking),
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    }));
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: getModelToken(Booking.name),
          useValue: mockBookingModel,
        },
        {
          provide: ShowTimesService,
          useValue: {
            reserveSeatsTemporarily: jest.fn().mockResolvedValue(null),
            findOne: jest.fn().mockResolvedValue({
              _id: 'someShowTimeId',
              price: 10,
            }),
          },
        },
        {
          provide: PaypalService,
          useValue: {
            createOrder: jest.fn().mockResolvedValue('approvalUrl'),
          },
        },
        {
          provide: MoviesService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({ name: 'The Matrix' }),
          },
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should create a new booking', async () => {
    const createBookingDto = {
      userId: 'someUserId',
      movieId: 'someMovieId',
      showTimeId: 'someShowTimeId',
      selectedSeats: [4, 5, 6],
      totalPrice: 30,
      paypalPaymentId: 'paypal123',
      paymentStatus: PaymentStatus.Paid,
    };

    const result = await service.create(createBookingDto);
    expect(result.booking).toEqual(mockBooking);
    expect(result.approvalUrl).toBe('approvalUrl');
  });
  it('should throw NotFoundException when no bookings are found', async () => {
    jest.spyOn(service, 'findAll').mockRejectedValue(new NotFoundException());
    await expect(service.findAll()).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException when booking is not found', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());
    await expect(
      service.findOne({ id: 'nonExistentBookingId' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException when updating a non-existent booking', async () => {
    jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());
    await expect(service.update('nonExistentBookingId', {})).rejects.toThrow(
      NotFoundException,
    );
  });
  it('should delete a booking', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
    await expect(service.remove('someBookingId')).resolves.not.toThrow();
  });

  it('should throw NotFoundException when trying to delete a non-existent booking', async () => {
    jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());
    await expect(service.remove('nonExistentBookingId')).rejects.toThrow(
      NotFoundException,
    );
  });
});
