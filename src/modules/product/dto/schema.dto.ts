import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  price: number;

  @Prop({ required: true, type: String })
  discount: number;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  image: string;

  @Prop({ required: true, type: String })
  category_id: string;

  @Prop({ required: true, type: String, default: 0 })
  total_star: number;

  @Prop({
    required: true,
    _id: false,
    type: {
      star1: { type: Number, default: 0 },
      star2: { type: Number, default: 0 },
      star3: { type: Number, default: 0 },
      star4: { type: Number, default: 0 },
      star5: { type: Number, default: 0 },
    },
    default: {
      star1: 0,
      star2: 0,
      star3: 0,
      star4: 0,
      star5: 0,
    },
  })
  rates: {
    star1: number;
    star2: number;
    star3: number;
    star4: number;
    star5: number;
  };

  @Prop({ required: true, type: Boolean, default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product)