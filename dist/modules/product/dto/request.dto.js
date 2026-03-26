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
exports.FilterProductDto = exports.ProductRequestDto = exports.CreateProductRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const api_dto_1 = require("../../../commom/api.dto");
const product_model_1 = require("../../../model/product.model");
class CreateProductRequestDto {
    name;
    price;
    discount;
    description;
    image;
    category;
}
exports.CreateProductRequestDto = CreateProductRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hamburger' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50000 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateProductRequestDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateProductRequestDto.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'string' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductRequestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductRequestDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: product_model_1.CATEGORY_PRODUCT }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductRequestDto.prototype, "category", void 0);
class ProductRequestDto extends CreateProductRequestDto {
    _id;
}
exports.ProductRequestDto = ProductRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProductRequestDto.prototype, "_id", void 0);
class FilterProductDto extends api_dto_1.IFilterOptions {
    category;
    price;
}
exports.FilterProductDto = FilterProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: product_model_1.CATEGORY_PRODUCT }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FilterProductDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: product_model_1.FILTER_PRICE }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FilterProductDto.prototype, "price", void 0);
