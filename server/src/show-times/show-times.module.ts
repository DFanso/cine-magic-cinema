import { Module } from '@nestjs/common';
import { ShowTimesService } from './show-times.service';
import { ShowTimesController } from './show-times.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShowTime, ShowTimeSchema } from './entities/show-time.entity';
import { MoviesModule } from 'src/movies/movies.module';
import { UsersModule } from 'src/users/users.module';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShowTime.name, schema: ShowTimeSchema },
    ]),
    MoviesModule,
    UsersModule,
    ClsModule,
  ],
  controllers: [ShowTimesController],
  providers: [ShowTimesService],
  exports: [ShowTimesService],
})
export class ShowTimesModule {}
