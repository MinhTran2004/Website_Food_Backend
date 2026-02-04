import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.controller';
import { CartModule } from './modules/cart/cart.module';
import { ProductRateModule } from './modules/product-rate/product-rate.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { PaymentModule } from './modules/vnpay/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_CONFIG'),
        retryAttempts: 5,
        retryDelay: 3000,
        ssl: true,
        tls: true,
        tlsAllowInvalidCertificates: true,
      }),
    }),
    ProductRateModule,
    ProductModule,
    AuthModule,
    UserModule,
    BlogModule,
    CartModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
