/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { METHOD_PAYMENT } from 'src/model/order.model';
import { Address } from 'src/modules/address/dto/schema.dto';
import { ProductRequestDto } from 'src/modules/product/dto/request.dto';
import { User, UserInfo } from 'src/modules/user/dto/schema.dto';

export type OrderDocument = Order & Document;
@Schema({ timestamps: true })
export class Order {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: UserInfo;

  @Prop({
    required: true,
    type: ProductRequestDto,
  })
  products: ProductRequestDto[];

  @Prop({
    required: true,
    type: Address,
  })
  address: Address;

  @Prop({
    required: true,
    type: Number,
  })
  total: number;

  @Prop({
    required: true,
    enum: METHOD_PAYMENT,
  })
  paymentMethods: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
