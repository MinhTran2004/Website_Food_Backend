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
exports.LoginFacebookRequestDto = exports.LoginGoogleRequestDto = exports.LoginRequestDto = exports.RegisterRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class RegisterRequestDto {
    username;
    email;
    password;
    provider;
}
exports.RegisterRequestDto = RegisterRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test@gmail.com' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'NORMAL', enum: client_1.Provider }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(client_1.Provider),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "provider", void 0);
class LoginRequestDto {
    email;
    password;
}
exports.LoginRequestDto = LoginRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test@gmail.com', type: String }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456', type: String, minLength: 6 }),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "password", void 0);
class LoginGoogleRequestDto {
    idToken;
    accessToken;
    provider;
}
exports.LoginGoogleRequestDto = LoginGoogleRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginGoogleRequestDto.prototype, "idToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginGoogleRequestDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, enum: client_1.Provider }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginGoogleRequestDto.prototype, "provider", void 0);
class LoginFacebookRequestDto {
    accessToken;
    provider;
}
exports.LoginFacebookRequestDto = LoginFacebookRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginFacebookRequestDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, enum: client_1.Provider }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginFacebookRequestDto.prototype, "provider", void 0);
