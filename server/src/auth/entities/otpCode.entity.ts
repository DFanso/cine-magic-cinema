import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OtpCodeDocument = Document & OtpCode;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: false,
  },
})
export class OtpCode {
  _id: Types.ObjectId;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, expires: 300 }) // 300 seconds = 5 minutes
  expiresAt: Date;
}

const OtpCodeSchema = SchemaFactory.createForClass(OtpCode);

export { OtpCodeSchema };
