import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { AuthGuard } from '@nestjs/passport';
import { ClsService } from 'nestjs-cls';
import { AppClsStore } from 'src/Types/user.types';
import { UsersService } from 'src/users/users.service';
import { BookingService } from 'src/booking/booking.service';
import mongoose from 'mongoose';

@ApiTags('feedbacks')
@Controller({ path: 'feedbacks', version: '1' })
export class FeedbacksController {
  constructor(
    private readonly feedbacksService: FeedbacksService,
    private readonly clsService: ClsService,
    private readonly usersService: UsersService,
    private readonly bookingService: BookingService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create feedback' })
  @ApiResponse({
    status: 201,
    description: 'The feedback has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createFeedbackDto: CreateFeedbackDto) {
    const context = this.clsService.get<AppClsStore>();
    if (!context || !context.user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersService.findOne({ _id: context.user.id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    createFeedbackDto.userId = user._id;

    const booking = await this.bookingService.findOne({
      userId: user._id,
      movieId: createFeedbackDto.movieId,
    });
    if (!booking) {
      throw new BadRequestException(
        `User with ID '${createFeedbackDto.userId}' has not booked the movie with ID '${createFeedbackDto.movieId}'.`,
      );
    }

    return this.feedbacksService.create(createFeedbackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all feedbacks' })
  @ApiResponse({ status: 200, description: 'All feedbacks returned.' })
  findAll() {
    return this.feedbacksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get feedback by ID' })
  @ApiResponse({ status: 200, description: 'Feedback found.' })
  @ApiResponse({ status: 404, description: 'Feedback not found.' })
  findOne(@Param('id') id: string) {
    return this.feedbacksService.findOne(id);
  }

  @Get('movie/:movieId')
  @ApiOperation({ summary: 'Get feedbacks for Movie' })
  @ApiResponse({ status: 200, description: 'Feedback found.' })
  @ApiResponse({ status: 404, description: 'Feedback not found.' })
  async findByMovie(@Param('movieId') movieId: string) {
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      throw new NotFoundException('Invalid movie ID');
    }

    const feedbacks = await this.feedbacksService.findAll({ movieId });

    if (feedbacks.length === 0) {
      throw new NotFoundException('No feedbacks found for the given movie');
    }

    return feedbacks;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOperation({ summary: 'Update feedback by ID' })
  @ApiResponse({ status: 200, description: 'Feedback updated.' })
  @ApiResponse({ status: 404, description: 'Feedback not found.' })
  update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbacksService.update(id, updateFeedbackDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete feedback by ID' })
  @ApiResponse({ status: 200, description: 'Feedback deleted.' })
  @ApiResponse({ status: 404, description: 'Feedback not found.' })
  remove(@Param('id') id: string) {
    return this.feedbacksService.remove(id);
  }
}
