import { IAddress } from './address.module';
import { ICart } from './cart.model';
import { IProduct } from './product.model';
import { IUser } from './user.modal';

export enum METHOD_PAYMENT {
  COD = 'COD',
  VNPAY = 'VNPAY',
}

export interface IOrder {
  _id?: string;
  user: IUser;
  products: IOrderProduct[];
  address: IAddress;
  total: number;
  paymentMethods: METHOD_PAYMENT;
}

export interface IOrderProduct extends IOrder { 
  product: IProduct
}

// export interface IOrderProduct extends IProduct {
//   quantity: number;
// }
