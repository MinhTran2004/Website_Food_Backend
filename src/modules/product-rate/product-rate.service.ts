/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HTTP_RESPONSE } from 'src/constants/api.constant';
import { IResponse } from 'src/model/api.model';
import { IProductRate } from 'src/model/product-rate.modal';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { ProductRateRequestDto } from './dto/request.dto';
import { ProductRate, ProductRateDocument } from './dto/schema.dto';

@Injectable()
export class ProductRateService {
    constructor(
        @InjectModel(ProductRate.name)
        private productRateModel: Model<ProductRateDocument>,
        private productService: ProductService,
        private userService: UserService
    ) { }

    async create(body: ProductRateRequestDto): Promise<IResponse<IProductRate | null>> {
        const { product_id, user_id, rate, comment } = body;

        const productExists = await this.productService.findById(product_id);

        if (!productExists) {
            return HTTP_RESPONSE.NOT_FOUND('en', 'Product not found');
        }

        const userExists = await this.userService.findById(user_id);

        if (!userExists) {
            return HTTP_RESPONSE.NOT_FOUND('en', 'User not found');
        }

        if (!rate && !comment) {
            return HTTP_RESPONSE.BAD_REQUEST('en')
        }

        const productRate = this.productRateModel.create(body)

        return HTTP_RESPONSE.OK('en', productRate)
    }
}
