import { ProductRequestDto } from 'src/modules/product/dto/request.dto';
import { IAddress } from './address.module';
import { IProduct } from './product.model';
import { IUser } from './user.modal';

export enum METHOD_PAYMENT {
  COD = 'COD',
  VNPAY = 'VNPAY',
}

export interface IOrder {
  user: IUser;
  products: ProductRequestDto[];
  address: IAddress;
  total: number;
  paymentMethods: METHOD_PAYMENT;
}

export interface IOrderProduct extends IOrder { 
  product: IProduct
}