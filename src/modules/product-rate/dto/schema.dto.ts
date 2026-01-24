import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { STAR } from 'src/model/product-rate.modal';

export type ProductRateDocument = ProductRate & Document;

@Schema({ timestamps: true })
export class ProductRate {
  @Prop({
    required: true, type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  })
  user_id: Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
  })
  product_id: Types.ObjectId;

  @Prop({ required: true, enum: STAR })
  rate: STAR;

  @Prop({ required: true, type: String })
  comment: string;

  @Prop({ required: true, type: Boolean, default: false })
  isActive: boolean;
}

export const ProductRateSchema = SchemaFactory.createForClass(ProductRate);
