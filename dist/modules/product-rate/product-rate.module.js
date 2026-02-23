"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRateModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_module_1 = require("../product/product.module");
const user_module_1 = require("../user/user.module");
const schema_dto_1 = require("./dto/schema.dto");
const product_rate_controller_1 = require("./product-rate.controller");
const product_rate_service_1 = require("./product-rate.service");
let ProductRateModule = class ProductRateModule {
};
exports.ProductRateModule = ProductRateModule;
exports.ProductRateModule = ProductRateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: schema_dto_1.ProductRate.name, schema: schema_dto_1.ProductRateSchema },
            ]),
            product_module_1.ProductModule,
            user_module_1.UserModule,
        ],
        providers: [product_rate_service_1.ProductRateService],
        controllers: [product_rate_controller_1.ProductRateController],
    })
], ProductRateModule);
