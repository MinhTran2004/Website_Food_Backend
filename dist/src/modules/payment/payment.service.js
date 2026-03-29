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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const qs = __importStar(require("qs"));
const crypto = __importStar(require("crypto"));
const payment_config_1 = require("./payment.config");
let PaymentService = class PaymentService {
    createVNPayUrl(amount, orderId, ipAddr) {
        const createDate = this.formatDate(new Date());
        const vnpParams = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: payment_config_1.paymentConfig.tmnCode,
            vnp_Locale: 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `Thanh-toan-don-hang-${orderId}`,
            vnp_OrderType: 'other',
            vnp_Amount: amount * 100,
            vnp_ReturnUrl: encodeURIComponent(payment_config_1.paymentConfig.returnUrl),
            vnp_IpAddr: '192.168.88.178',
            vnp_CreateDate: createDate,
        };
        const sortedParams = this.sortObject(vnpParams);
        const signData = qs.stringify(sortedParams, { encode: false });
        const secureHash = crypto
            .createHmac('sha512', payment_config_1.paymentConfig.secretKey.trim())
            .update(signData, 'utf-8')
            .digest('hex');
        sortedParams.vnp_SecureHashType = 'SHA512';
        sortedParams.vnp_SecureHash = secureHash;
        const paymentUrl = payment_config_1.paymentConfig.vnpUrl +
            '?' +
            qs.stringify(sortedParams, { encode: false });
        return paymentUrl;
    }
    verifyVNPayReturn(vnpParams) {
        const secureHash = vnpParams['vnp_SecureHash'];
        delete vnpParams['vnp_SecureHash'];
        delete vnpParams['vnp_SecureHashType'];
        const sortedParams = this.sortObject(vnpParams);
        const signData = qs.stringify(sortedParams, { encode: false });
        const hmac = crypto.createHmac('sha512', payment_config_1.paymentConfig.secretKey.trim());
        const signed = hmac.update(signData).digest('hex');
        return secureHash === signed;
    }
    sortObject(obj) {
        const sorted = {};
        Object.keys(obj)
            .sort()
            .forEach((key) => {
            sorted[key] = obj[key];
        });
        return sorted;
    }
    formatDate(date) {
        const pad = (n) => (n < 10 ? '0' + n : n);
        return (date.getFullYear().toString() +
            pad(date.getMonth() + 1) +
            pad(date.getDate()) +
            pad(date.getHours()) +
            pad(date.getMinutes()) +
            pad(date.getSeconds()));
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)()
], PaymentService);
