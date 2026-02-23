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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductOrderRequest = exports.CreateOrderRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const order_model_1 = require("../../../model/order.model");
const request_dto_1 = require("../../address/dto/request.dto");
class CreateOrderRequestDto {
    products;
    address;
    total;
    paymentMethods;
}
exports.CreateOrderRequestDto = CreateOrderRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Array }),
    __metadata("design:type", Array)
], CreateOrderRequestDto.prototype, "products", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: request_dto_1.UpdateAddressRequestDto }),
    __metadata("design:type", Object)
], CreateOrderRequestDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number }),
    __metadata("design:type", Number)
], CreateOrderRequestDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, enum: order_model_1.METHOD_PAYMENT }),
    __metadata("design:type", String)
], CreateOrderRequestDto.prototype, "paymentMethods", void 0);
class ProductOrderRequest {
    idUser;
    idProduct;
    quantity;
    isActive;
    products;
}
exports.ProductOrderRequest = ProductOrderRequest;
