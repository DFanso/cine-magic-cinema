import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  const mockMovie = {
    _id: new Types.ObjectId(),
    name: 'Inception',
    year: 2010,
    coverImage: 'http://example.com/inception-cover.jpg',
    bannerImage: 'http://example.com/inception-banner.jpg',
    trailer: 'http://example.com/inception-trailer',
    startDate: '2010-07-16',
    nowShowing: true,
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    cast: [
      'Leonardo DiCaprio',
      'Joseph Gordon-Levitt',
      'Ellen Page',
      'Tom Hardy',
      'Ken Watanabe',
      'Cillian Murphy',
      'Marion Cotillard',
      'Michael Caine',
    ],
    producedBy: ['Emma Thomas', 'Christopher Nolan'],
    writtenBy: ['Christopher Nolan'],
    directedBy: ['Christopher Nolan'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MoviesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockMovie),
            findAll: jest.fn().mockResolvedValue([mockMovie]),
            findOne: jest.fn().mockResolvedValue(mockMovie),
            update: jest.fn().mockResolvedValue(mockMovie),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should create a new movie', async () => {
    const result = await service.create(mockMovie);
    expect(result).toEqual(mockMovie);
  });
  it('should return an array of movies', async () => {
    const movies = await service.findAll();
    expect(movies).toEqual([mockMovie]);
  });
  it('should retrieve a specific movie by filter', async () => {
    const movie = await service.findOne({ id: 'someMovieId' });
    expect(movie).toEqual(mockMovie);
  });

  it('should throw NotFoundException when movie is not found', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());
    await expect(service.findOne({ id: 'nonExistentMovieId' })).rejects.toThrow(
      NotFoundException,
    );
  });
  it('should update a movie', async () => {
    const updatedMovie = { ...mockMovie, name: 'Inception' };
    const result = await service.update('someMovieId', { name: 'Inception' });
    expect(result).toEqual(updatedMovie);
  });

  it('should throw NotFoundException when updating a non-existent movie', async () => {
    jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());
    await expect(service.update('nonExistentMovieId', {})).rejects.toThrow(
      NotFoundException,
    );
  });
  it('should delete a movie', async () => {
    const result = await service.remove('someMovieId');
    expect(result).toEqual({ deleted: true });
  });

  it('should throw NotFoundException when trying to delete a non-existent movie', async () => {
    jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());
    await expect(service.remove('nonExistentMovieId')).rejects.toThrow(
      NotFoundException,
    );
  });
});
