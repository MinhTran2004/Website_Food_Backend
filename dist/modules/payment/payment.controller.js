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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
let PaymentController = class PaymentController {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    createPayment(req, res) {
        const ipAddr = req.headers['x-forwarded-for'] ||
            req.socket.remoteAddress;
        const paymentUrl = this.paymentService.createVNPayUrl(100000, 'ORDER123', ipAddr);
        return res.redirect(paymentUrl);
    }
    vnpayReturn(query, res) {
        const isValid = this.paymentService.verifyVNPayReturn(query);
        if (!isValid) {
            return res.status(400).send('Invalid signature');
        }
        if (query.vnp_ResponseCode === '00') {
            return res.send('Thanh toán thành công');
        }
        else {
            return res.send('Thanh toán thất bại');
        }
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Get)('vnpay'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Get)('vnpay-return'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "vnpayReturn", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
