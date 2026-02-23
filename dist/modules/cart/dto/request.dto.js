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
exports.UpdateCartRequestDto = exports.CreateCartRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateCartRequestDto {
    idProduct;
    quantity;
    isActive;
}
exports.CreateCartRequestDto = CreateCartRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], CreateCartRequestDto.prototype, "idProduct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number }),
    __metadata("design:type", Number)
], CreateCartRequestDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], CreateCartRequestDto.prototype, "isActive", void 0);
class UpdateCartRequestDto extends CreateCartRequestDto {
    idCart;
}
exports.UpdateCartRequestDto = UpdateCartRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], UpdateCartRequestDto.prototype, "idCart", void 0);
