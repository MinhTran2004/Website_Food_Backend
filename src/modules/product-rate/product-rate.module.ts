import { Module } from '@nestjs/common';
import { ProductRateService } from './product-rate.service';
import { ProductRateController } from './product-rate.controller';

@Module({
  providers: [ProductRateService],
  controllers: [ProductRateController]
})
export class ProductRateModule {}
