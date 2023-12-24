import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { Feedback, FeedbackSchema } from './entities/feedback.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingModule } from 'src/booking/booking.module';
import { ClsModule } from 'nestjs-cls';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Feedback.name, schema: FeedbackSchema },
    ]),
    BookingModule,
    ClsModule,
    UsersModule,
  ],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
  exports: [FeedbacksService],
})
export class FeedbacksModule {}
