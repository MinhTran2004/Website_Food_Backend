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
exports.OrderSchema = exports.Order = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const order_model_1 = require("../../../model/order.model");
const schema_dto_1 = require("../../address/dto/schema.dto");
const request_dto_1 = require("../../product/dto/request.dto");
const schema_dto_2 = require("../../user/dto/schema.dto");
let Order = class Order {
    user;
    products;
    address;
    total;
    paymentMethods;
};
exports.Order = Order;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: schema_dto_2.User.name,
    }),
    __metadata("design:type", schema_dto_2.UserInfo)
], Order.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: request_dto_1.ProductRequestDto,
    }),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: schema_dto_1.Address,
    }),
    __metadata("design:type", schema_dto_1.Address)
], Order.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: order_model_1.METHOD_PAYMENT,
    }),
    __metadata("design:type", String)
], Order.prototype, "paymentMethods", void 0);
exports.Order = Order = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Order);
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
