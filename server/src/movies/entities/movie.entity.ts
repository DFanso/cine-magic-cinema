import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @ApiProperty({
    type: String,
    description: 'Name of the movie',
    example: 'The Matrix',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Year of the movie release',
    example: 1999,
  })
  @Prop({ required: true })
  year: number;

  @ApiProperty({
    type: String,
    description: 'URL to the cover image of the movie',
    example: 'http://example.com/coverimage.jpg',
  })
  @Prop()
  coverImage: string;

  @ApiProperty({
    type: String,
    description: 'URL to the banner image of the movie',
    example: 'http://example.com/bannerimage.jpg',
  })
  @Prop()
  bannerImage: string;

  @ApiProperty({
    type: String,
    description: 'URL to the movie trailer',
    example: 'http://example.com/trailer',
  })
  @Prop()
  trailer: string;

  @ApiProperty({
    type: Date,
    description: 'Start date of the movie in ISO format',
    example: '2023-12-15',
  })
  @Prop({ required: true })
  startDate: Date;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if the movie is currently showing',
    example: true,
  })
  @Prop({ required: true, type: Boolean })
  nowShowing: boolean;

  @ApiProperty({
    type: String,
    description: 'Description of the movie',
    example:
      'A computer hacker learns about the true nature of reality and his role in the war against its controllers.',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    type: [String],
    description: 'List of cast members',
    example: ['Keanu Reeves', 'Laurence Fishburne'],
  })
  @Prop({ type: [String] })
  cast: string[];

  @ApiProperty({
    type: [String],
    description: 'List of producers',
    example: ['Joel Silver'],
  })
  @Prop({ type: [String] })
  producedBy: string[];

  @ApiProperty({
    type: [String],
    description: 'List of writers',
    example: ['Lilly Wachowski', 'Lana Wachowski'],
  })
  @Prop({ type: [String] })
  writtenBy: string[];

  @ApiProperty({
    type: [String],
    description: 'List of directors',
    example: ['Lilly Wachowski', 'Lana Wachowski'],
  })
  @Prop({ type: [String] })
  directedBy: string[];
}

const MovieSchema = SchemaFactory.createForClass(Movie);

export { MovieSchema };
