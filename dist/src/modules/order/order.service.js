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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const api_constant_1 = require("../../constants/api.constant");
const error_1 = require("../../model/error");
const cart_service_1 = require("../cart/cart.service");
const user_service_1 = require("../user/user.service");
let OrderService = class OrderService {
    prisma;
    userService;
    cartService;
    constructor(prisma, userService, cartService) {
        this.prisma = prisma;
        this.userService = userService;
        this.cartService = cartService;
    }
    async create(body, user) {
        const { address, paymentMethods, cartItems, total } = body;
        const { idUser } = user;
        if (!address || !paymentMethods || !cartItems || !total || !idUser)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('idAddress, method, product, total, idUser is required'));
        const userExists = await this.userService.findById(idUser);
        if (!userExists)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('user is not found'));
        if (cartItems.length === 0) {
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('Minimum 1 product'));
        }
        const payload = {
            idUser: userExists.id,
            user: userExists,
            address: { ...body.address },
            paymentMethods: body.paymentMethods,
            cartItems: cartItems.map((item) => ({
                id: item.id,
                idCart: item.idCart,
                quantity: item.quantity,
                isActive: item.isActive,
                product: {
                    ...item.product,
                },
            })),
            total: body.total,
        };
        const order = await this.prisma.order.create({ data: payload });
        const productIds = body.cartItems
            .map((item) => item.id)
            .filter((id) => Boolean(id));
        const hiddenCart = await this.cartService.patchMany(productIds, {
            isActive: false,
        });
        if (!hiddenCart)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('Remove product in cart failure'));
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
            this.prisma.order.findMany({
                where: { idUser },
                skip,
                take: pageSize,
                orderBy: [{ createdAt: 'desc' }],
            }),
            this.prisma.order.count({ where: { idUser } }),
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
        return this.prisma.order.findUnique({ where: { id } });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        cart_service_1.CartService])
], OrderService);
