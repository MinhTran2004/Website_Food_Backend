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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const request_dto_1 = require("./dto/request.dto");
const order_service_1 = require("./order.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const api_dto_1 = require("../../commom/api.dto");
let OrderController = class OrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    create(body, req) {
        const user = req.user;
        return this.orderService.create(body, user);
    }
    patch(req, options) {
        const user = req.user;
        return this.orderService.getListOrder(options, user);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)('payment-method-cod'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new order' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.CreateOrderRequestDto, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('get-list-order'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lsit order' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, api_dto_1.IFilterOptions]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "patch", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('Order'),
    (0, common_1.Controller)('order'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
