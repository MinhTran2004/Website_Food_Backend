import { Injectable } from '@nestjs/common';
import * as qs from 'qs';
import * as crypto from 'crypto';
import { paymentConfig } from './payment.config';

@Injectable()
export class PaymentService {
  createVNPayUrl(amount: number, orderId: string, ipAddr: string) {
    const createDate = this.formatDate(new Date());

    const vnpParams: any = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: paymentConfig.tmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh-toan-don-hang-${orderId}`,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: encodeURIComponent(paymentConfig.returnUrl),
      vnp_IpAddr: '192.168.88.178',
      vnp_CreateDate: createDate,
    };

    // 1️⃣ sort + ký (KHÔNG có SecureHashType)
    const sortedParams = this.sortObject(vnpParams);

    const signData = qs.stringify(sortedParams, { encode: false });

    const secureHash = crypto
      .createHmac('sha512', paymentConfig.secretKey.trim())
      .update(signData, 'utf-8')
      .digest('hex');

    sortedParams.vnp_SecureHashType = 'SHA512';
    sortedParams.vnp_SecureHash = secureHash;

    // 4️⃣ build URL (BẮT BUỘC encode)
    const paymentUrl =
      paymentConfig.vnpUrl +
      '?' +
      qs.stringify(sortedParams, { encode: false });

    return paymentUrl;
  }

  verifyVNPayReturn(vnpParams: any) {
    const secureHash = vnpParams['vnp_SecureHash'];
    delete vnpParams['vnp_SecureHash'];
    delete vnpParams['vnp_SecureHashType'];

    const sortedParams = this.sortObject(vnpParams);
    const signData = qs.stringify(sortedParams, { encode: false });

    const hmac = crypto.createHmac('sha512', paymentConfig.secretKey.trim());
    const signed = hmac.update(signData).digest('hex');

    return secureHash === signed;
  }

  private sortObject(obj: any) {
    const sorted: any = {};
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        sorted[key] = obj[key];
      });
    return sorted;
  }

  private formatDate(date: Date) {
    const pad = (n: number) => (n < 10 ? '0' + n : n);
    return (
      date.getFullYear().toString() +
      pad(date.getMonth() + 1) +
      pad(date.getDate()) +
      pad(date.getHours()) +
      pad(date.getMinutes()) +
      pad(date.getSeconds())
    );
  }
}
