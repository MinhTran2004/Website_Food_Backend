"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRateService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const api_constant_1 = require("../../constants/api.constant");
const product_service_1 = require("../product/product.service");
const user_service_1 = require("../user/user.service");
const schema_dto_1 = require("./dto/schema.dto");
let ProductRateService = class ProductRateService {
    productRateModel;
    productService;
    userService;
    constructor(productRateModel, productService, userService) {
        this.productRateModel = productRateModel;
        this.productService = productService;
        this.userService = userService;
    }
    async create(body) {
        const { product_id, user_id, rate, comment } = body;
        const productExists = await this.productService.findById(product_id);
        if (!productExists) {
            return api_constant_1.HTTP_RESPONSE.NOT_FOUND('en', 'Product not found');
        }
        const userExists = await this.userService.findById(user_id);
        if (!userExists) {
            return api_constant_1.HTTP_RESPONSE.NOT_FOUND('en', 'User not found');
        }
        if (!rate && !comment) {
            return api_constant_1.HTTP_RESPONSE.BAD_REQUEST('en');
        }
        const productRate = this.productRateModel.create(body);
        return api_constant_1.HTTP_RESPONSE.OK('en', productRate);
    }
};
exports.ProductRateService = ProductRateService;
exports.ProductRateService = ProductRateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_dto_1.ProductRate.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        product_service_1.ProductService,
        user_service_1.UserService])
], ProductRateService);
