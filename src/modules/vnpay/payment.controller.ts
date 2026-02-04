import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('vnpay')
  createPayment(@Req() req: Request, @Res() res: Response) {
    const ipAddr =
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress;

    const paymentUrl =
      this.paymentService.createVNPayUrl(
        100000,
        'ORDER123',
        ipAddr as string,
      );

    return res.redirect(paymentUrl);
  }

  @Get('vnpay-return')
  vnpayReturn(@Query() query: any, @Res() res: Response) {
    const isValid =
      this.paymentService.verifyVNPayReturn(query);

    if (!isValid) {
      return res.status(400).send('Invalid signature');
    }

    if (query.vnp_ResponseCode === '00') {
      // ✅ Thanh toán thành công
      return res.send('Thanh toán thành công');
    } else {
      // ❌ Thất bại
      return res.send('Thanh toán thất bại');
    }
  }
}
