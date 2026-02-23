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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_service_1 = require("../product/product.service");
const user_service_1 = require("../user/user.service");
const schema_dto_1 = require("./dto/schema.dto");
const error_1 = require("../../model/error");
const api_constant_1 = require("../../constants/api.constant");
let OrderService = class OrderService {
    orderModel;
    userService;
    productService;
    constructor(orderModel, userService, productService) {
        this.orderModel = orderModel;
        this.userService = userService;
        this.productService = productService;
    }
    async create(body, user) {
        const { address, paymentMethods, products, total } = body;
        const { idUser } = user;
        if (!address._id || !paymentMethods || !products || !total || !idUser)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('idAddress, method, product, total, idUser is required'));
        const userExists = await this.userService.findById(idUser);
        if (!userExists)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('user is not found'));
        if (products.length === 0) {
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('Minimum 1 product'));
        }
        const payload = {
            user: {
                ...userExists,
                _id: userExists._id.toString(),
            },
            address: body.address,
            paymentMethods: body.paymentMethods,
            products: body.products,
            total: body.total,
        };
        const order = await this.orderModel.create(payload);
        return api_constant_1.HTTP_RESPONSE.CREATED('en', order);
    }
    async getListOrder(options, user) {
        const { idUser } = user;
        const page = Number(options.page) || 1;
        const pageSize = Number(options.pageSize) || 20;
        const skip = (page - 1) * pageSize;
        const userExists = await this.userService.findById(idUser);
        if (!userExists)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('User is not found'));
        const [items, total] = await Promise.all([
            this.orderModel
                .find({ 'user._id': idUser })
                .skip(skip)
                .limit(pageSize)
                .sort({ createAt: -1 })
                .lean(),
            this.orderModel.countDocuments({ idUser: idUser }),
        ]);
        const totalPage = Math.ceil(total / pageSize);
        const nextPage = page < totalPage;
        const previousPage = page > 1;
        return api_constant_1.HTTP_RESPONSE.OK('en', {
            items: items,
            pagination: {
                page,
                pageSize,
                total,
                totalPage,
                nextPage,
                previousPage,
            },
        });
    }
    async findById(id) {
        return this.orderModel.findById(id);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_dto_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        product_service_1.ProductService])
], OrderService);
