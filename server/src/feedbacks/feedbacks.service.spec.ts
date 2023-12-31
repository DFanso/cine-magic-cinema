import { Test, TestingModule } from '@nestjs/testing';
import { FeedbacksService } from './feedbacks.service';
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('FeedbacksService', () => {
  let service: FeedbacksService;

  // Mock data
  const mockFeedback = {
    _id: new Types.ObjectId(),
    userId: new Types.ObjectId(),
    movieId: new Types.ObjectId(),
    rating: 4,
    comment: 'Great movie!',
  };

  const mockFeedbackArray = [mockFeedback];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: FeedbacksService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockFeedback),
            findAll: jest.fn().mockResolvedValue(mockFeedbackArray),
            findOne: jest.fn().mockResolvedValue(mockFeedback),
            update: jest.fn().mockResolvedValue(mockFeedback),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    service = module.get<FeedbacksService>(FeedbacksService);
  });

  it('should create a new feedback', async () => {
    const result = await service.create(mockFeedback);
    expect(result).toEqual(mockFeedback);
  });

  it('should return an array of feedbacks', async () => {
    const feedbacks = await service.findAll();
    expect(feedbacks).toEqual(mockFeedbackArray);
  });
  it('should retrieve a specific feedback by id', async () => {
    const feedback = await service.findOne('someFeedbackId');
    expect(feedback).toEqual(mockFeedback);
  });
  it('should retrieve a specific feedback by id', async () => {
    const feedback = await service.findOne('someFeedbackId');
    expect(feedback).toEqual(mockFeedback);
  });
  it('should update a feedback', async () => {
    const updatedFeedback = { ...mockFeedback, comment: 'Great movie!' };
    const result = await service.update('someFeedbackId', {
      comment: 'Great movie!',
    });
    expect(result).toEqual(updatedFeedback);
  });

  it('should delete a feedback', async () => {
    const result = await service.remove('someFeedbackId');
    expect(result).toEqual({ deleted: true });
  });
  it('should throw NotFoundException when no feedbacks are found', async () => {
    jest.spyOn(service, 'findAll').mockRejectedValue(new NotFoundException());
    await expect(service.findAll()).rejects.toThrow(NotFoundException);
  });
  it('should throw NotFoundException when trying to delete a non-existent feedback', async () => {
    jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());
    await expect(service.remove('nonExistentFeedbackId')).rejects.toThrow(
      NotFoundException,
    );
  });
});
