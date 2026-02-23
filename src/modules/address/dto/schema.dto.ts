/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AddressDocument = Address & Document;
@Schema({ timestamps: true })
export class Address {
  @Prop({ required: true, type: String })
  idUser: string;

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
