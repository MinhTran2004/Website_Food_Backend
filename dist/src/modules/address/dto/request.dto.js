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
exports.UpdateAddressRequestDto = exports.CreateAddressRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAddressRequestDto {
    nameAddress;
    phone;
    addressDetail;
    district;
    isDefault;
    city;
}
exports.CreateAddressRequestDto = CreateAddressRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAddressRequestDto.prototype, "nameAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAddressRequestDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAddressRequestDto.prototype, "addressDetail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAddressRequestDto.prototype, "district", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Boolean }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreateAddressRequestDto.prototype, "isDefault", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAddressRequestDto.prototype, "city", void 0);
class UpdateAddressRequestDto extends CreateAddressRequestDto {
    id;
}
exports.UpdateAddressRequestDto = UpdateAddressRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateAddressRequestDto.prototype, "id", void 0);
