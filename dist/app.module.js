"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./modules/auth/auth.module");
const blog_controller_1 = require("./modules/blog/blog.controller");
const cart_module_1 = require("./modules/cart/cart.module");
const product_rate_module_1 = require("./modules/product-rate/product-rate.module");
const product_module_1 = require("./modules/product/product.module");
const user_module_1 = require("./modules/user/user.module");
const payment_module_1 = require("./modules/payment/payment.module");
const address_module_1 = require("./modules/address/address.module");
const order_module_1 = require("./modules/order/order.module");
const mesage_module_1 = require("./modules/mesage/mesage.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const uri = configService.get('MONGODB_CONFIG');
                    return {
                        uri,
                        retryAttempts: 5,
                        retryDelay: 3000,
                        serverSelectionTimeoutMS: 30000,
                        family: 4,
                        autoIndex: true,
                        connectionFactory: (connection) => {
                            connection.on('error', (err) => console.error('[MongoDB]', err.message));
                            connection.on('connected', () => console.log('[MongoDB] Connected'));
                            return connection;
                        },
                    };
                },
            }),
            product_rate_module_1.ProductRateModule,
            product_module_1.ProductModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            blog_controller_1.BlogModule,
            cart_module_1.CartModule,
            payment_module_1.PaymentModule,
            address_module_1.AddressModule,
            order_module_1.OrderModule,
            mesage_module_1.MessageModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
