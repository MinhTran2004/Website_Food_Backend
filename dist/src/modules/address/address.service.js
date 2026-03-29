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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const api_constant_1 = require("../../constants/api.constant");
const error_1 = require("../../model/error");
let AddressService = class AddressService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(body, user) {
        const { nameAddress, addressDetail, city, district, phone } = body;
        const { idUser } = user;
        if (!nameAddress || !addressDetail || !city || !district || !phone)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST(' nameAddress, addressDetail, city, district, phone is required'));
        if (!idUser)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('User is not found'));
        const payload = { idUser: idUser, ...body };
        await this.prisma.address.updateMany({
            data: { isDefault: false },
            where: {
                idUser: idUser,
            },
        });
        const addressNew = await this.prisma.address.create({ data: payload });
        return api_constant_1.HTTP_RESPONSE.CREATED('en', addressNew);
    }
    async getAddressByDefault(user) {
        const { idUser } = user;
        if (!idUser)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('User is not found'));
        const address = await this.prisma.address.findFirst({
            where: {
                idUser: idUser,
                isDefault: true,
                isActive: true,
            },
        });
        return api_constant_1.HTTP_RESPONSE.OK('en', address);
    }
    async getListAddress(quey, user) {
        const { idUser } = user;
        const page = quey.page | 1;
        const pageSize = quey.pageSize | 20;
        const skip = (page - 1) * pageSize;
        if (!idUser)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('idUser is required'));
        const [items, total] = await Promise.all([
            this.prisma.address.findMany({
                where: { idUser: idUser, isActive: true },
                skip,
                take: pageSize,
                orderBy: [
                    {
                        isDefault: 'desc',
                    },
                    { createdAt: 'desc' },
                ],
            }),
            this.prisma.address.count({
                where: {
                    isActive: true,
                    idUser: idUser,
                },
            }),
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
    async patch(body, user) {
        const { id, nameAddress, addressDetail, city, district, phone } = body;
        const { id: idAddres, ...data } = body;
        const { idUser } = user;
        if (!idAddres ||
            !nameAddress ||
            !addressDetail ||
            !city ||
            !district ||
            !phone)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('nanameAddress, addressDetail, city, district, phone is required'));
        if (!idUser)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('User is not found'));
        if (body.isDefault === true) {
            await this.prisma.address.updateMany({
                data: {
                    isDefault: false,
                },
                where: {
                    idUser,
                    NOT: { id: idAddres },
                },
            });
        }
        const address = await this.prisma.address.update({
            data: { ...data },
            where: { idUser, id: idAddres },
        });
        return api_constant_1.HTTP_RESPONSE.OK('en', address);
    }
    async delete(id) {
        return await this.prisma.address.delete({ where: { id } });
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddressService);
