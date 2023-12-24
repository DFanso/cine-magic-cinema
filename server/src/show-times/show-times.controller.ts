import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  NotFoundException,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ShowTimesService } from './show-times.service';
import { CreateShowTimeDto } from './dto/create-show-time.dto';
import { UpdateShowTimeDto } from './dto/update-show-time.dto';
import { MoviesService } from 'src/movies/movies.service';
import mongoose from 'mongoose';
import { ClsService } from 'nestjs-cls';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { AppClsStore, UserType } from 'src/Types/user.types';

@ApiTags('show-times')
@Controller({ path: 'movies/:movieId/show-times', version: '1' })
export class ShowTimesController {
  constructor(
    private readonly showTimesService: ShowTimesService,
    private readonly movieService: MoviesService,
    private readonly usersService: UsersService,
    private readonly clsService: ClsService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create a new show time for a movie' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The show time has been successfully created.',
    type: CreateShowTimeDto,
  })
  @ApiParam({ name: 'movieId', type: 'string' })
  @ApiBody({ type: CreateShowTimeDto })
  async create(
    @Param('movieId') movieId: string,
    @Body() createShowTimeDto: CreateShowTimeDto,
  ) {
    const movie = await this.movieService.findOne({ _id: movieId });
    if (!movie) {
      throw new NotFoundException(`Movie with ID '${movieId}' not found.`);
    }
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
    createShowTimeDto.movieId = new mongoose.Types.ObjectId(movieId);
    return this.showTimesService.create(createShowTimeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all show times for a movie' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of show times for the movie',
    type: [CreateShowTimeDto],
  })
  @ApiParam({ name: 'movieId', type: 'string' })
  findAll(@Param('movieId') movieId: string) {
    return this.showTimesService.findAll(movieId);
  }

  @Get(':showTimeId')
  @ApiOperation({ summary: 'Get a show time by id for a movie' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Show time details',
    type: CreateShowTimeDto,
  })
  @ApiParam({ name: 'movieId', type: 'string' })
  @ApiParam({ name: 'showTimeId', type: 'string' })
  findOne(
    @Param('movieId') movieId: string,
    @Param('showTimeId') showTimeId: string,
  ) {
    return this.showTimesService.findOne({ movieId, _id: showTimeId });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':showTimeId')
  @ApiOperation({ summary: 'Update a show time for a movie' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The show time has been successfully updated.',
  })
  @ApiParam({ name: 'movieId', type: 'string' })
  @ApiParam({ name: 'showTimeId', type: 'string' })
  @ApiBody({ type: UpdateShowTimeDto })
  async update(
    @Param('movieId') movieId: string,
    @Param('showTimeId') showTimeId: string,
    @Body() updateShowTimeDto: UpdateShowTimeDto,
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
    return this.showTimesService.update(showTimeId, updateShowTimeDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':showTimeId')
  @ApiOperation({ summary: 'Delete a show time for a movie' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The show time has been successfully deleted.',
  })
  @ApiParam({ name: 'movieId', type: 'string' })
  @ApiParam({ name: 'showTimeId', type: 'string' })
  async remove(
    @Param('movieId') movieId: string,
    @Param('showTimeId') showTimeId: string,
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
    return this.showTimesService.remove(movieId, showTimeId);
  }
}
