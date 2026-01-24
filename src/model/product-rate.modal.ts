export enum STAR {
    STAR_1 = 'STAR_1',
    STAR_2 = 'STAR_2',
    STAR_3 = 'STAR_3',
    STAR_4 = 'STAR_4',
    STAR_5 = 'STAR_5'
}

export interface IProductRate {
    user_id: string;
    product_id: string;
    rate: STAR;
    comment: string;
    isActive: boolean;
}