import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ResetOtpCodeDocument = Document & ResetOtpCode;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: false,
  },
})
export class ResetOtpCode {
  _id: Types.ObjectId;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true, expires: 300 }) // 300 seconds = 5 minutes
  expiresAt: Date;

  @Prop({ required: true })
  email: string;
}

const ResetOtpCodeSchema = SchemaFactory.createForClass(ResetOtpCode);

export { ResetOtpCodeSchema };
