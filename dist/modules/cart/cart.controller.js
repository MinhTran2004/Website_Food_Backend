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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_dto_1 = require("../../commom/api.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const cart_service_1 = require("./cart.service");
const request_dto_1 = require("./dto/request.dto");
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    create(req, body) {
        const user = req.user;
        return this.cartService.create(body, user);
    }
    patchQuantity(req, body) {
        const user = req.user;
        return this.cartService.patchQuantity(body, user);
    }
    delete(id) {
        return this.cartService.delete(id);
    }
    getListCart(query, req) {
        const user = req.user;
        return this.cartService.getListcart(query, user);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Add product to your cart' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.CreateCartRequestDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('update-quantity-cart'),
    (0, swagger_1.ApiOperation)({ summary: 'Update cart by id' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.UpdateCartRequestDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "patchQuantity", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete cart by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('get-list-cart'),
    (0, swagger_1.ApiOperation)({ summary: 'Get list cart' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_dto_1.IFilterOptions, Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getListCart", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('Cart'),
    (0, common_1.Controller)('cart'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
