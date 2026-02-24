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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const api_constant_1 = require("../../constants/api.constant");
const error_1 = require("../../model/error");
const schema_dto_1 = require("./dto/schema.dto");
let AddressService = class AddressService {
    addressModel;
    constructor(addressModel) {
        this.addressModel = addressModel;
    }
    async create(body, user) {
        const { nameAddress, addressDetail, city, district, phone } = body;
        const { idUser } = user;
        if (!nameAddress || !addressDetail || !city || !district || !phone)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST(' nameAddress, addressDetail, city, district, phone is required'));
        if (!idUser)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('User is not found'));
        const payload = { idUser: idUser, ...body };
        await this.addressModel.updateMany({ idUser: idUser }, { isDefault: false });
        const addressNew = await this.addressModel.create(payload);
        if (!addressNew)
            throw new common_1.ConflictException(error_1.Errors.CONFLICT('Create address new is failed'));
        return api_constant_1.HTTP_RESPONSE.CREATED('en', addressNew);
    }
    async getAddressByDefault(user) {
        const { idUser } = user;
        if (!idUser)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('User is not found'));
        const address = await this.addressModel.findOne({
            idUser: idUser,
            isDefault: true,
            isActive: true,
        });
        if (!address)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('No addresses have a default status.'));
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
            this.addressModel
                .find({ idUser: idUser, isActive: true })
                .skip(skip)
                .limit(pageSize)
                .sort({ createAt: -1, default: -1 })
                .lean(),
            this.addressModel.countDocuments({ isActive: true }),
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
        const { _id, nameAddress, addressDetail, city, district, phone, isDefault, } = body;
        const { idUser } = user;
        if (!_id ||
            !nameAddress ||
            !addressDetail ||
            !city ||
            !district ||
            !phone ||
            !isDefault)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('anameAddress, addressDetail, city, district, phone, isDefault is required'));
        if (!idUser)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('User is not found'));
        if (body.isDefault === true) {
            await this.addressModel.updateMany({ idUser: idUser }, { isDefault: false });
        }
        const address = await this.addressModel.findByIdAndUpdate(_id, body);
        return api_constant_1.HTTP_RESPONSE.OK('en', address);
    }
    async delete(id) {
        return await this.addressModel.findByIdAndDelete(id);
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_dto_1.Address.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AddressService);
