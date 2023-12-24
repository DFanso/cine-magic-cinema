import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  NotFoundException,
  HttpException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { UsersService } from 'src/users/users.service';
import { ClsService } from 'nestjs-cls';
import { AuthGuard } from '@nestjs/passport';
import { AppClsStore, UserType } from 'src/Types/user.types';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@ApiTags('movies')
@Controller({ path: 'movies', version: '1' })
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly usersService: UsersService,
    private readonly clsService: ClsService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The movie has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async create(@Body() createMovieDto: CreateMovieDto) {
    const context = this.clsService.get<AppClsStore>();
    if (!context || !context.user) {
      throw new HttpException(
        'Authentication required',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const user = await this.usersService.findOne({ _id: context.user.id });
    if (user.type != UserType.Admin) {
      throw new HttpException('User is not an Admin', HttpStatus.BAD_REQUEST);
    }

    const apiKey = this.configService.get<string>('OMDB_API_KEY');
    const title = createMovieDto.name;
    const year = createMovieDto.year;
    const url = `http://www.omdbapi.com/?&apikey=${apiKey}&t=${encodeURIComponent(
      title,
    )}&y=${year}`;

    try {
      const response = await this.httpService.get(url).toPromise();
      const movieDetails = response.data;

      if (movieDetails.Response === 'False') {
        throw new NotFoundException(movieDetails.Error);
      }

      const extendedMovieDto = {
        ...createMovieDto,
        description: movieDetails.Plot,
        cast: movieDetails.Actors.split(', '),
        producedBy: movieDetails.Production
          ? movieDetails.Production.split(', ')
          : [],
        writtenBy: movieDetails.Writer.split(', '),
        directedBy: movieDetails.Director.split(', '),
      };

      return this.moviesService.create(extendedMovieDto);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException('Movie not found in OMDb.');
      } else {
        throw new HttpException(
          'Failed to fetch movie details from OMDb.',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
    }
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of movies retrieved successfully.',
  })
  @ApiQuery({
    name: 'nowShowing',
    required: false,
    type: Boolean,
    description: 'Filter movies by now showing status',
  })
  findAll(@Query('nowShowing') nowShowing: string) {
    const isNowShowing = nowShowing === 'true';
    return this.moviesService.findAll(isNowShowing);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movie retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movie not found.',
  })
  async findOne(@Param('id') id: string) {
    const movie = await this.moviesService.findOne({ _id: id });
    if (!movie) {
      throw new NotFoundException(`Movie with ID '${id}' not found.`);
    }
    return movie;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The movie has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movie not found.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    const context = this.clsService.get<AppClsStore>();
    if (!context || !context.user) {
      throw new HttpException(
        'Authentication required',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const user = await this.usersService.findOne({ _id: context.user.id });
    if (user.type != UserType.Admin) {
      throw new HttpException('User is not an Admin', HttpStatus.BAD_REQUEST);
    }
    const updatedMovie = await this.moviesService.update(id, updateMovieDto);
    if (!updatedMovie) {
      throw new NotFoundException(`Movie with ID '${id}' not found.`);
    }
    return updatedMovie;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The movie has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movie not found.',
  })
  async remove(@Param('id') id: string) {
    const context = this.clsService.get<AppClsStore>();
    if (!context || !context.user) {
      throw new HttpException(
        'Authentication required',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const user = await this.usersService.findOne({ _id: context.user.id });
    if (user.type != UserType.Admin) {
      throw new HttpException('User is not an Admin', HttpStatus.BAD_REQUEST);
    }
    const deletedMovie = await this.moviesService.remove(id);
    if (!deletedMovie) {
      throw new NotFoundException(`Movie with ID '${id}' not found.`);
    }
    return { message: `Movie with ID '${id}' has been deleted.` };
  }
}
