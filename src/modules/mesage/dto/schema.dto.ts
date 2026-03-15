import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/modules/user/dto/schema.dto';

export type ChatDocument = Chat & Document;

@Schema({ timestamps: true })
export class Chat {
  @Prop({
    type: [],
    ref: 'User',
    required: true,
  })
  members: string[];

  @Prop({ default: true })
  isActive: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

//message
export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Chat.name })
  roomId: Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  senderId: Types.ObjectId;

  @Prop({
    required: true,
    type: String,
  })
  message: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
