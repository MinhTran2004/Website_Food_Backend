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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const api_constant_1 = require("../../constants/api.constant");
const error_1 = require("../../model/error");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ProductService = class ProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const { name, price, description, image, discount, category } = data;
        if (!name && !price && !description && !image && !discount && !category)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('Name, price, description, image, discount, category is empty!'));
        const nameExisted = await this.prisma.product.findFirst({
            where: { name },
        });
        if (nameExisted) {
            return api_constant_1.HTTP_RESPONSE.CONFLICT('en');
        }
        const product = await this.prisma.product.create({ data });
        return api_constant_1.HTTP_RESPONSE.CREATED('en', product);
    }
    async getListProduct(options) {
        const page = Number(options.page) || 1;
        const pageSize = Number(options.pageSize) || 20;
        const skip = (page - 1) * pageSize;
        const filter = {
            category: options.category || 'MAIN_COURES',
            isActive: true,
        };
        if (options.price === 'MIN') {
            filter.price = { lte: 50000 };
        }
        else if (options.price === 'MEDIUM') {
            filter.price = { gt: 50000, lte: 150000 };
        }
        else if (options.price === 'MAX') {
            filter.price = { gt: 150000 };
        }
        const [items, total] = await Promise.all([
            this.prisma.product.findMany({
                where: { ...filter },
                skip,
                take: pageSize,
                orderBy: [
                    {
                        createdAt: 'desc',
                    },
                ],
            }),
            this.prisma.product.count({
                where: { ...filter },
            }),
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
    async delete(id) {
        const productDeleted = await this.prisma.product.delete({ where: { id } });
        if (!productDeleted) {
            return api_constant_1.HTTP_RESPONSE.NOT_FOUND('en');
        }
        return api_constant_1.HTTP_RESPONSE.OK('en', id);
    }
    async patch(id, body) {
        const productExists = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!productExists) {
            return api_constant_1.HTTP_RESPONSE.NOT_FOUND('en');
        }
        const productUpdate = await this.prisma.product.update({
            where: { id },
            data: {
                ...body,
            },
        });
        return api_constant_1.HTTP_RESPONSE.OK('en', productUpdate);
    }
    async findById(id) {
        return this.prisma.product.findUnique({ where: { id } });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
