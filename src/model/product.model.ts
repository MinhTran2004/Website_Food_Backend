export interface IProduct {
    name: string;
    price: number;
    discount: number;
    description: string;
    description_detail: string;
    image: string;
    category_id: string;
    total_star: number;
    rates: IRate;
    isActive: boolean;
}

export interface IRate {
    star1: number | 0,
    star2: number | 0,
    star3: number | 0,
    star4: number | 0,
    star5: number | 0,
}