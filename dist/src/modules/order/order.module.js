"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../user/user.module");
const schema_dto_1 = require("./dto/schema.dto");
const order_controller_1 = require("./order.controller");
const order_service_1 = require("./order.service");
const cart_module_1 = require("../cart/cart.module");
const prisma_service_1 = require("../../../prisma/prisma.service");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            cart_module_1.CartModule,
            mongoose_1.MongooseModule.forFeature([{ name: schema_dto_1.Order.name, schema: schema_dto_1.OrderSchema }]),
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, prisma_service_1.PrismaService],
        exports: [order_service_1.OrderService],
    })
], OrderModule);
