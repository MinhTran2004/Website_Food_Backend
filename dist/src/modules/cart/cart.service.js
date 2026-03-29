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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = __importDefault(require("mongoose"));
const prisma_service_1 = require("../../../prisma/prisma.service");
const api_constant_1 = require("../../constants/api.constant");
const error_1 = require("../../model/error");
const product_service_1 = require("../product/product.service");
const user_service_1 = require("../user/user.service");
let CartService = class CartService {
    prisma;
    userService;
    productService;
    constructor(prisma, userService, productService) {
        this.prisma = prisma;
        this.userService = userService;
        this.productService = productService;
    }
    async create(body, user) {
        const { idProduct, quantity } = body;
        const { idUser } = user;
        if (!idProduct || !idUser)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('idProduct and idUser are required'));
        if (!quantity || quantity <= 0 || !Number.isInteger(quantity))
            throw new common_1.BadRequestException('Quantity must be a positive integer');
        const userExists = await this.userService.findById(idUser);
        if (!userExists)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('user is not found'));
        const productExists = await this.productService.findById(idProduct);
        if (!productExists)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('idProduct is not found'));
        const productInCartExists = await this.prisma.cart.findFirst({
            where: {
                idUser: idUser,
                idProduct: idProduct,
                isActive: true,
            },
        });
        if (productInCartExists)
            throw new common_1.ConflictException(error_1.Errors.CONFLICT('Sản phẩm đã tồn tại trong giỏ hàng'));
        const data = {
            idUser,
            idProduct,
            quantity,
        };
        const cart = await this.prisma.cart.create({ data });
        return api_constant_1.HTTP_RESPONSE.OK('en', cart);
    }
    async delete(id) {
        const cart = await this.prisma.cart.delete({ where: { id } });
        if (!cart)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('Cart is not found'));
        return api_constant_1.HTTP_RESPONSE.OK('en', cart);
    }
    async patchMany(ids, body) {
        return this.prisma.cart.updateMany({
            where: {
                id: {
                    in: ids,
                },
            },
            data: {
                ...body,
            },
        });
    }
    async patch(body, user) {
        const { idCart, idProduct, quantity } = body;
        const { idUser } = user;
        if (!idCart || !idProduct || !idUser)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('idCart, idProduct and idUser are required'));
        if (!mongoose_1.default.Types.ObjectId.isValid(idCart) ||
            !mongoose_1.default.Types.ObjectId.isValid(idProduct) ||
            !mongoose_1.default.Types.ObjectId.isValid(idUser))
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('Invalid ObjectId'));
        if (!quantity || quantity <= 0 || !Number.isInteger(quantity))
            throw new common_1.BadRequestException('Quantity must be a positive integer');
        const userExists = await this.userService.findById(idUser);
        if (!userExists)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('user is not found'));
        const productExists = await this.productService.findById(idProduct);
        if (!productExists)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('idProduct is not found'));
        const cart = await this.prisma.cart.update({
            where: { id: idCart },
            data: { ...body },
        });
        if (!cart)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('Cart is not found'));
        return api_constant_1.HTTP_RESPONSE.OK('en', cart);
    }
    async getListcart(options, user) {
        const { idUser } = user;
        const page = Number(options.page) || 1;
        const pageSize = Number(options.pageSize) || 20;
        const skip = (page - 1) * pageSize;
        const userExists = await this.userService.findById(idUser);
        if (!userExists)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('User is not found'));
        const [items, total] = await Promise.all([
            this.prisma.cart.findMany({
                where: { idUser: idUser, isActive: true },
                include: { product: true },
                skip,
                orderBy: [
                    {
                        createdAt: 'desc',
                    },
                ],
            }),
            this.prisma.cart.count({ where: { idUser: idUser, isActive: true } }),
        ]);
        const totalPage = Math.ceil(total / pageSize);
        const nextPage = page < totalPage;
        const previousPage = page > 1;
        return api_constant_1.HTTP_RESPONSE.OK('en', {
            items,
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
        return this.prisma.cart.findUnique({ where: { id } });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        product_service_1.ProductService])
], CartService);
