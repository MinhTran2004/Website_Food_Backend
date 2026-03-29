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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const request_dto_1 = require("../user/dto/request.dto");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    authService;
    userService;
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(body) {
        return this.authService.login(body);
    }
    async regester(body) {
        return this.userService.create(body);
    }
    async loginGoogle(body) {
        return this.authService.loginGoogle(body);
    }
    async loginFacebook(body) {
        return this.authService.loginFacebook(body);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiBody)({ type: request_dto_1.LoginRequestDto }),
    (0, swagger_1.ApiOperation)({ summary: 'Login account' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.LoginRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new account' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RegisterRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "regester", null);
__decorate([
    (0, common_1.Post)('login-google'),
    (0, swagger_1.ApiOperation)({ summary: "Login with google" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.LoginGoogleRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginGoogle", null);
__decorate([
    (0, common_1.Post)('login-facebook'),
    (0, swagger_1.ApiOperation)({ summary: "Login with facebook" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.LoginGoogleRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginFacebook", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
