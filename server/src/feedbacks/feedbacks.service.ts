import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback, FeedbackDocument } from './entities/feedback.entity';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const newFeedback = new this.feedbackModel(createFeedbackDto);
    return newFeedback.save();
  }

  async findAll(filter = {}): Promise<Feedback[]> {
    const feedbacks = await this.feedbackModel
      .find(
        filter,
        Object.keys(this.feedbackModel.schema.obj)
          .map((key) => key)
          .join(' '),
      )
      .exec();

    if (feedbacks.length === 0) {
      throw new NotFoundException('No feedbacks found matching the criteria');
    }
    return feedbacks;
  }

  async findOne(id: string): Promise<Feedback> {
    return this.feedbackModel.findById(id).exec();
  }

  async update(
    id: string,
    updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackModel
      .findByIdAndUpdate(id, updateFeedbackDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.feedbackModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Feedback with ID '${id}' not found.`);
    }
    return { deleted: true };
  }
}
