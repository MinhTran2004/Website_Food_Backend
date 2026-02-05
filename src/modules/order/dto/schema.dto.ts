/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

export type OrderDocument = Order & Document;
@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  idUser: Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
  })
  idProduct: Types.ObjectId;

  @Prop({
    required: true,
    type: Number,
  })
  quantity: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
