import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

import { UserType, UserStatus } from '../../Types/user.types';

export type UserDocument = Document & User;

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({ type: String, enum: UserType, default: UserType.Customer })
  type: UserType;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.Unverified })
  status: UserStatus;
}

const UserSchema = SchemaFactory.createForClass(User);

// Pagination plugin
UserSchema.plugin(mongoosePaginate);

// Password hashing middleware
UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export { UserSchema };
