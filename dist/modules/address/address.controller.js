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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const address_service_1 = require("./address.service");
const request_dto_1 = require("./dto/request.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const api_dto_1 = require("../../commom/api.dto");
let AddressController = class AddressController {
    addressService;
    constructor(addressService) {
        this.addressService = addressService;
    }
    create(req, body) {
        const user = req.user;
        return this.addressService.create(body, user);
    }
    getAddressByDefault(req) {
        const user = req.user;
        return this.addressService.getAddressByDefault(user);
    }
    getListAddress(req, query) {
        const user = req.user;
        return this.addressService.getListAddress(query, user);
    }
    patch(req, body) {
        const user = req.user;
        return this.addressService.patch(body, user);
    }
    delete(id) {
        return this.addressService.delete(id);
    }
};
exports.AddressController = AddressController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a address' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.CreateAddressRequestDto]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('get-address-by-default'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a address' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "getAddressByDefault", null);
__decorate([
    (0, common_1.Get)('get-list-address'),
    (0, swagger_1.ApiOperation)({ summary: 'get list address' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, api_dto_1.IFilterOptions]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "getListAddress", null);
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a address' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.UpdateAddressRequestDto]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "delete", null);
exports.AddressController = AddressController = __decorate([
    (0, swagger_1.ApiTags)('Address'),
    (0, common_1.Controller)('address'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
