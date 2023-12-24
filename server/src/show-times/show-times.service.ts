import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateShowTimeDto } from './dto/create-show-time.dto';
import { UpdateShowTimeDto } from './dto/update-show-time.dto';
import { ShowTime, ShowTimeDocument } from './entities/show-time.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ShowTimesService {
  constructor(
    @InjectModel(ShowTime.name) private showTimeModel: Model<ShowTimeDocument>,
  ) {}

  async create(createShowTimeDto: CreateShowTimeDto): Promise<ShowTime> {
    const createdShowTime = new this.showTimeModel(createShowTimeDto);
    return createdShowTime.save();
  }

  async findAll(movieId: string): Promise<ShowTime[]> {
    return this.showTimeModel.find({ movieId }).populate('movieId');
  }

  async findOne(filter: any): Promise<ShowTimeDocument> {
    const showTime = await this.showTimeModel
      .findOne(
        filter,
        Object.keys(this.showTimeModel.schema.obj)
          .map((key) => key)
          .join(' '),
      )
      .populate('movieId')
      .exec();
    if (!showTime) {
      throw new NotFoundException(`ShowTime not found.`);
    }
    return showTime;
  }
  async findById(id: string): Promise<ShowTimeDocument> {
    const booking = await this.showTimeModel.findById(id).exec();
    if (!booking) {
      throw new NotFoundException(`Booking with ID '${id}' not found`);
    }
    return booking;
  }

  async update(
    id: string,
    updateShowTimeDto: UpdateShowTimeDto,
  ): Promise<ShowTime> {
    const updatedShowTime = await this.showTimeModel
      .findByIdAndUpdate(id, updateShowTimeDto, { new: true })
      .exec();
    if (!updatedShowTime) {
      throw new NotFoundException(`ShowTime with ID '${id}' not found.`);
    }
    return updatedShowTime;
  }

  async remove(movieId: string, id: string): Promise<{ deleted: boolean }> {
    const result = await this.showTimeModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`ShowTime with ID '${id}' not found.`);
    }
    return { deleted: true };
  }

  async reserveSeatsTemporarily(
    showTimeId: string,
    selectedSeats: number[],
    reservationExpires: Date,
    bookingId: mongoose.Schema.Types.ObjectId,
  ): Promise<void> {
    const showTime = await this.showTimeModel.findById(showTimeId);
    if (!showTime) {
      throw new NotFoundException(
        `ShowTime with ID '${showTimeId}' not found.`,
      );
    }
    const tempReservations = selectedSeats.map((seatNumber) => ({
      seatNumber,
      reservedUntil: reservationExpires,
      bookingId: bookingId,
    }));

    await this.showTimeModel.updateOne(
      { _id: showTimeId },
      {
        $push: {
          temporaryReservations: {
            $each: tempReservations,
          },
        },
      },
    );
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async removeExpiredSeatReservations() {
    const now = new Date();
    await this.showTimeModel.updateMany(
      {},
      {
        $set: {
          temporaryReservations: {
            $filter: {
              input: '$temporaryReservations',
              as: 'reservation',
              cond: { $gte: ['$$reservation.reservedUntil', now] }, // Keep reservations that are not expired
            },
          },
        },
      },
    );
  }

  getCollection() {
    return this.showTimeModel.collection;
  }
}
