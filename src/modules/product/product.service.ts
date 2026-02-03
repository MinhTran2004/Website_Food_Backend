/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFilterOptions } from 'src/commom/api.dto';
import { HTTP_RESPONSE } from 'src/constants/api.constant';
import {
  IBaseResponse,
  IResponse,
  IResponseListData,
} from 'src/model/api.model';
import { Errors } from 'src/model/error';
import { IProduct } from 'src/model/product.model';
import { ProductRequestDto } from './dto/request.dto';
import { Product, ProductDocument } from './dto/schema.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(data: ProductRequestDto): Promise<IResponse<IProduct | null>> {
    const {
      name,
      price,
      description,
      description_detail,
      image,
      discount,
      category_id,
    } = data;

    if (
      !name &&
      !price &&
      !description &&
      !description_detail &&
      !image &&
      !discount &&
      !category_id
    )
      throw new BadRequestException(
        Errors.BAD_REQUEST(
          'Name, price, description, description_detail, image, discount, category_id is empty!',
        ),
      );

    const nameExisted = await this.productModel.findOne({ name: name });

    if (nameExisted) {
      return HTTP_RESPONSE.CONFLICT('en');
    }

    const product = await this.productModel.create(data);
    return HTTP_RESPONSE.CREATED('en', product);
  }

  async getListProduct(
    options: IFilterOptions,
  ): Promise<IResponseListData<IProduct | null>> {
    const page = Number(options.page) || 1;
    const pageSize = Number(options.pageSize) || 20;
    const skip = (page - 1) * pageSize;

    const [items, total] = await Promise.all([
      this.productModel
        .find({})
        .skip(skip)
        .limit(pageSize)
        .sort({ createAt: -1 })
        .lean(),
      this.productModel.countDocuments({}),
    ]);

    const products = items.map((item: any) => ({
      id: item._id.toString(),
      ...item,
      _id: undefined,
    }));

    const totalPage = Math.ceil(total / pageSize);
    const nextPage = page < totalPage;
    const previousPage = page > 1;

    return HTTP_RESPONSE.OK('en', {
      items: products,
      pagination: {
        page,
        pageSize,
        total,
        totalPage,
        nextPage,
        previousPage,
      },
    });
  }

  async delete(id: string): Promise<IBaseResponse> {
    const productDeleted = await this.productModel.findByIdAndDelete(id);

    if (!productDeleted) {
      return HTTP_RESPONSE.NOT_FOUND('en');
    }

    return HTTP_RESPONSE.OK('en', id);
  }

  async patch(
    id: string,
    body: ProductRequestDto,
  ): Promise<IResponse<IProduct | null>> {
    const productExists = await this.productModel.findById(id);
    if (!productExists) {
      return HTTP_RESPONSE.NOT_FOUND('en');
    }

    const productUpdate = await this.productModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return HTTP_RESPONSE.OK('en', productUpdate);
  }

  async findById(productId: string) {
    return this.productModel.findById(productId);
  }
}
