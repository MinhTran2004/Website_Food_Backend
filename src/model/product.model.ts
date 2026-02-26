export interface IProduct {
  _id: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  description_detail: string;
  image: string;
  category: CATEGORY_PRODUCT;
  total_star: number;
  rates: IRate;
  isActive: boolean;
}

export interface IRate {
  star1: number | 0;
  star2: number | 0;
  star3: number | 0;
  star4: number | 0;
  star5: number | 0;
}

export enum CATEGORY_PRODUCT {
  MAIN_COURES = 'MAIN_COURES',
  DESSERT = 'DESSERT',
  APPETIZER = 'APPETIZER',
}

export enum FILTER_PRICE {
  MIN = 'MIN',
  MEDIUM = 'MEDIUM',
  MAX = 'MAX',
}