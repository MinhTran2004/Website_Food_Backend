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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const api_constant_1 = require("../../constants/api.constant");
const error_1 = require("../../model/error");
const schema_dto_1 = require("./dto/schema.dto");
let ProductService = class ProductService {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(data) {
        const { name, price, description, description_detail, image, discount, category_id, } = data;
        if (!name &&
            !price &&
            !description &&
            !description_detail &&
            !image &&
            !discount &&
            !category_id)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('Name, price, description, description_detail, image, discount, category_id is empty!'));
        const nameExisted = await this.productModel.findOne({ name: name });
        if (nameExisted) {
            return api_constant_1.HTTP_RESPONSE.CONFLICT('en');
        }
        const product = await this.productModel.create(data);
        return api_constant_1.HTTP_RESPONSE.CREATED('en', product);
    }
    async getListProduct(options) {
        const page = Number(options.page) || 1;
        const pageSize = Number(options.pageSize) || 20;
        const skip = (page - 1) * pageSize;
        const [items, total] = await Promise.all([
            this.productModel
                .find({})
                .skip(skip)
                .limit(pageSize)
                .sort({ createAt: -1 })
                .lean(),
            this.productModel.countDocuments({}),
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
        const productDeleted = await this.productModel.findByIdAndDelete(id);
        if (!productDeleted) {
            return api_constant_1.HTTP_RESPONSE.NOT_FOUND('en');
        }
        return api_constant_1.HTTP_RESPONSE.OK('en', id);
    }
    async patch(id, body) {
        const productExists = await this.productModel.findById(id);
        if (!productExists) {
            return api_constant_1.HTTP_RESPONSE.NOT_FOUND('en');
        }
        const productUpdate = await this.productModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        return api_constant_1.HTTP_RESPONSE.OK('en', productUpdate);
    }
    async findById(productId) {
        return this.productModel.findById(productId);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_dto_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
