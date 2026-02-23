"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const api_constant_1 = require("../../constants/api.constant");
const error_1 = require("../../model/error");
const product_service_1 = require("../product/product.service");
const user_service_1 = require("../user/user.service");
const schema_dto_1 = require("./dto/schema.dto");
let CartService = class CartService {
    cartModel;
    userService;
    productService;
    constructor(cartModel, userService, productService) {
        this.cartModel = cartModel;
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
        const productInCartExists = await this.cartModel.find({
            idUser: idUser,
            idProduct: idProduct,
            isActive: true,
        });
        if (productInCartExists.length > 0)
            throw new common_1.ConflictException(error_1.Errors.CONFLICT('Sản phẩm đã tồn tại trong giỏ hàng'));
        const payload = {
            idUser,
            idProduct,
            quantity,
        };
        const cart = await this.cartModel.create(payload);
        return api_constant_1.HTTP_RESPONSE.OK('en', cart);
    }
    async delete(id) {
        const cart = await this.cartModel.findByIdAndDelete(id);
        if (!cart)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('Cart is not found'));
        return api_constant_1.HTTP_RESPONSE.OK('en', cart);
    }
    async patchQuantity(body, user) {
        const { idCart, idProduct, quantity } = body;
        const { idUser } = user;
        if (!idCart || !idProduct || !idUser)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('idCart, idProduct and idUser are required'));
        if (!mongoose_2.default.Types.ObjectId.isValid(idCart) ||
            !mongoose_2.default.Types.ObjectId.isValid(idProduct) ||
            !mongoose_2.default.Types.ObjectId.isValid(idUser))
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('Invalid ObjectId'));
        if (!quantity || quantity <= 0 || !Number.isInteger(quantity))
            throw new common_1.BadRequestException('Quantity must be a positive integer');
        const userExists = await this.userService.findById(idUser);
        if (!userExists)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('user is not found'));
        const productExists = await this.productService.findById(idProduct);
        if (!productExists)
            throw new common_1.NotFoundException(error_1.Errors.ITEM_NOT_FOUND('idProduct is not found'));
        const cart = await this.cartModel.findByIdAndUpdate(idCart, { idProduct, idUser, quantity }, {
            new: true,
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
            this.cartModel
                .find({ idUser: idUser, isActive: true })
                .populate('idProduct')
                .skip(skip)
                .limit(pageSize)
                .sort({ createAt: -1 })
                .lean(),
            this.cartModel.countDocuments({ idUser: idUser, isActive: true }),
        ]);
        const products = items.map(({ idProduct, ...rest }) => ({
            ...rest,
            product: idProduct,
        }));
        const totalPage = Math.ceil(total / pageSize);
        const nextPage = page < totalPage;
        const previousPage = page > 1;
        return api_constant_1.HTTP_RESPONSE.OK('en', {
            items: products,
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
        return this.cartModel.findById(id);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_dto_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        product_service_1.ProductService])
], CartService);
