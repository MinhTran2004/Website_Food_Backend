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
import { PaymentModule } from './modules/payment/payment.module';
import { AddressModule } from './modules/address/address.module';
import { OrderModule } from './modules/order/order.module';
import { MessageModule } from './modules/mesage/mesage.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('DATABASE_URL');

        return {
          uri,

          retryAttempts: 5,
          retryDelay: 3000,
          serverSelectionTimeoutMS: 30000,

          // ✅ FIX QUAN TRỌNG
          family: 4, // force IPv4 (tránh lỗi mạng nhà)
          autoIndex: true,

          connectionFactory: (connection: any) => {
            connection.on('error', (err: Error) =>
              console.error('[MongoDB]', err.message),
            );
            connection.on('connected', () =>
              console.log('[MongoDB] Connected'),
            );
            return connection;
          },
        };
      },
    }),
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    ProductRateModule,
    ProductModule,
    AuthModule,
    UserModule,
    BlogModule,
    CartModule,
    PaymentModule,
    AddressModule,
    OrderModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
