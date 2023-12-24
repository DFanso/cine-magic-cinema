import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const createdMovie = new this.movieModel(createMovieDto);
    return createdMovie.save();
  }

  async findAll(nowShowing?: boolean): Promise<Movie[]> {
    let query = this.movieModel.find();

    if (nowShowing !== undefined) {
      query = query.where('nowShowing').equals(nowShowing);
    }

    return query.exec();
  }

  async findOne(filter: any): Promise<MovieDocument | null> {
    const movie = await this.movieModel.findOne(
      filter,
      Object.keys(this.movieModel.schema.obj)
        .map((key) => key)
        .join(' '),
    );
    if (!movie) {
      throw new NotFoundException(`Movie with ID '${filter.id}' not found.`);
    }
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const updatedMovie = await this.movieModel
      .findByIdAndUpdate(id, updateMovieDto, { new: true })
      .exec();
    if (!updatedMovie) {
      throw new NotFoundException(`Movie with ID '${id}' not found.`);
    }
    return updatedMovie;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.movieModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Movie with ID '${id}' not found.`);
    }
    return { deleted: true };
  }
}
