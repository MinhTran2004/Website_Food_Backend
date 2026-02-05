/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Product } from 'src/modules/product/dto/schema.dto';
import { User } from 'src/modules/user/dto/schema.dto';

export type CartDocument = Cart & Document;
@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
  idUser: Types.ObjectId;
  
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Product.name,
  })
  idProduct: Types.ObjectId;

  @Prop({
    required: true,
    type: Number,
  })
  quantity: number;

  @Prop({
    required: true,
    type: Boolean,
    default: true,
  })
  isActive: boolean;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
