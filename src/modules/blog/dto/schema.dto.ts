/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true })
export class Blog {
    @Prop({ require: true, type: String })
    contentHtml: string;

    @Prop({ require: true, type: Number, default: 0 })
    view: number;

    @Prop({ require: true, type: Boolean, default: true })
    isActive: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);