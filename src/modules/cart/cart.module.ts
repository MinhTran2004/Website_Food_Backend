/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './dto/schema.dto';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    UserModule,
    ProductModule,
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  controllers: [CartController],
  providers: [CartService, PrismaService],
  exports: [CartService],
})
export class CartModule {}
