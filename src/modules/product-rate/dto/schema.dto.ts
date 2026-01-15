import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

export type ProductRateDocument = ProductComment & Document;

@Schema({ timestamps: true })
export class ProductComment {
  @Prop({ required: true, type: String })
  user_id: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
  })
  product_id: Types.ObjectId;

  @Prop({ required: true, type: Number, max: 5, min: 1 })
  rate: number;

  @Prop({ required: true, type: String })
  comment: string;

  @Prop({ required: true, type: Boolean, default: false })
  status: boolean;
}

export const ProductCommentSchema =
  SchemaFactory.createForClass(ProductComment);
