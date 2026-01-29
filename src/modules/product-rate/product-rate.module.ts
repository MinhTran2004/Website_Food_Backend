import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { ProductRate, ProductRateSchema } from './dto/schema.dto';
import { ProductRateController } from './product-rate.controller';
import { ProductRateService } from './product-rate.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductRate.name, schema: ProductRateSchema },
    ]),
    ProductModule,
    UserModule,
  ],
  providers: [ProductRateService],
  controllers: [ProductRateController],
})
export class ProductRateModule {}
