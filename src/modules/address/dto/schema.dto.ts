/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { User } from 'src/modules/user/dto/schema.dto';

export type AddressDocument = Address & Document;
@Schema({ timestamps: true })
export class Address {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  idUser: Types.ObjectId;

  @Prop({ required: true, type: String })
  nameAddress: string;

  @Prop({ required: true, type: String })
  phone: string;

  @Prop({ required: true, type: String })
  addressDetail: string;

  @Prop({ required: true, type: String })
  district: string;

  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: Boolean, default: false })
  isDefault: boolean;

  @Prop({ required: true, type: Boolean, default: true })
  isActive: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
