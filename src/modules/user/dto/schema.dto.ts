import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PROVIDER } from 'src/model/user.modal';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, type: String, default: 'https://i.pinimg.com/236x/ee/68/14/ee681444f9d95896412897b799efc41b.jpg' })
  avatar: string;

  @Prop({ required: true, type: String })
  username: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    type: String,
  })
  email: string;

  @Prop({ type: String, select: false })
  password: string;

  @Prop({ required: true, enum: PROVIDER })
  provider: string;

  @Prop({
    default: true, type: Boolean, defaultOptions: {
      default: true
    }
  })
  isActive: boolean;

  @Prop({ type: String })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
