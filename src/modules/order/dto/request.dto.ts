import { ApiProperty } from '@nestjs/swagger';
import type { IAddress } from 'src/model/address.module';
import { IOrderProduct, METHOD_PAYMENT } from 'src/model/order.model';
import { UpdateAddressRequestDto } from 'src/modules/address/dto/request.dto';

export class CreateOrderRequestDto {
  @ApiProperty({ required: true, type: Array })
  products: IOrderProduct[];

  @ApiProperty({ required: true, type: UpdateAddressRequestDto  })
  address: IAddress ;

  @ApiProperty({ required: true, type: Number })
  total: number;

  @ApiProperty({ required: true, enum: METHOD_PAYMENT })
  paymentMethods: METHOD_PAYMENT;
}

export class ProductOrderRequest {
  idUser: string;
  idProduct: string;
  quantity: number;
  isActive: boolean;
  products: IOrderProduct[]
}
