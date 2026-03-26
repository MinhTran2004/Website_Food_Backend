import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CATEGORY_PRODUCT } from 'src/model/product.model';

export type ProductDocument = Product & Document;

export class ProductStar {
  @Prop({ required: true, type: Number, default: 0 })
  star1: number;
  @Prop({ required: true, type: Number, default: 0 })
  star2: number;
  @Prop({ required: true, type: Number, default: 0 })
  star3: number;
  @Prop({ required: true, type: Number, default: 0 })
  star4: number;
  @Prop({ required: true, type: Number, default: 0 })
  star5: number;
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Number })
  discount: number;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  image: string;

  @Prop({ required: true, enum: CATEGORY_PRODUCT })
  category: string;

  @Prop({ required: true, type: Number, default: 0 })
  total_star: number;

  @Prop({
    required: true,
    _id: false,
    type: ProductStar,
    default: () => ({
      star1: 0,
      star2: 0,
      star3: 0,
      star4: 0,
      star5: 0,
    }),
  })
  rates: ProductStar;

  @Prop({ required: true, type: Boolean, default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
