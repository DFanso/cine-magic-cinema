import { Test, TestingModule } from '@nestjs/testing';
import { ShowTimesService } from './show-times.service';
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('ShowTimesService', () => {
  let service: ShowTimesService;

  const mockShowTime = {
    _id: new Types.ObjectId(),
    movieId: new Types.ObjectId(),
    date: '2023-12-15',
    startTime: '21:00',
    endTime: '22:00',
    Seats: {
      totalSeats: 100,
      bookedSeats: [1, 2, 3],
    },
    price: 15.99,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ShowTimesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockShowTime),
            findAll: jest.fn().mockResolvedValue([mockShowTime]),
            findOne: jest.fn().mockResolvedValue(mockShowTime),
            findById: jest.fn().mockResolvedValue(mockShowTime),
            update: jest.fn().mockResolvedValue(mockShowTime),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
            reserveSeatsTemporarily: jest.fn().mockResolvedValue(undefined),
            removeExpiredSeatReservations: jest
              .fn()
              .mockResolvedValue(undefined),
            getCollection: jest.fn().mockReturnValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<ShowTimesService>(ShowTimesService);
  });

  it('should create a new show time', async () => {
    const result = await service.create(mockShowTime);
    expect(result).toEqual(mockShowTime);
  });
  it('should return an array of show times', async () => {
    const showTimes = await service.findAll('someMovieId');
    expect(showTimes).toEqual([mockShowTime]);
  });
  it('should retrieve a specific show time by filter', async () => {
    const showTime = await service.findOne({ id: 'someShowTimeId' });
    expect(showTime).toEqual(mockShowTime);
  });

  it('should throw NotFoundException when show time is not found', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());
    await expect(
      service.findOne({ id: 'nonExistentShowTimeId' }),
    ).rejects.toThrow(NotFoundException);
  });
  it('should update a show time', async () => {
    const updatedShowTime = { ...mockShowTime, startTime: '21:00' };
    const result = await service.update('someShowTimeId', {
      startTime: '21:00',
    });
    expect(result).toEqual(updatedShowTime);
  });

  it('should throw NotFoundException when updating a non-existent show time', async () => {
    jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());
    await expect(service.update('nonExistentShowTimeId', {})).rejects.toThrow(
      NotFoundException,
    );
  });
  it('should delete a show time', async () => {
    const result = await service.remove('someMovieId', 'someShowTimeId');
    expect(result).toEqual({ deleted: true });
  });

  it('should throw NotFoundException when trying to delete a non-existent show time', async () => {
    jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());
    await expect(
      service.remove('someMovieId', 'nonExistentShowTimeId'),
    ).rejects.toThrow(NotFoundException);
  });
});
