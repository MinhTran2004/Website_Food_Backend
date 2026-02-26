/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HTTP_RESPONSE } from 'src/constants/api.constant';
import {
  IBaseResponse,
  IResponse,
  IResponseListData,
} from 'src/model/api.model';
import { Errors } from 'src/model/error';
import { IProduct } from 'src/model/product.model';
import { CreateProductRequestDto, FilterProductDto } from './dto/request.dto';
import { Product, ProductDocument } from './dto/schema.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(
    data: CreateProductRequestDto,
  ): Promise<IResponse<IProduct | null>> {
    const { name, price, description, image, discount, category } = data;

    if (!name && !price && !description && !image && !discount && !category)
      throw new BadRequestException(
        Errors.BAD_REQUEST(
          'Name, price, description, image, discount, category is empty!',
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
    options: FilterProductDto,
  ): Promise<IResponseListData<IProduct | null>> {
    const page = Number(options.page) || 1;
    const pageSize = Number(options.pageSize) || 20;
    const skip = (page - 1) * pageSize;

    const filter: any = {
      category: options.category || 'MAIN_COURES',
      isActive: true,
    };

    if (options.price === 'MIN') {
      filter.price = { $lte: 50000 };
    } else if (options.price === 'MEDIUM') {
      filter.price = { $gt: 50000, $lte: 150000 };
    } else if (options.price === 'MAX') {
      filter.price = { $gt: 150000 };
    }
    
    const [items, total] = await Promise.all([
      this.productModel
        .find(filter)
        .skip(skip)
        .limit(pageSize)
        .sort({ createAt: -1 })
        .lean(),
      this.productModel.countDocuments(filter),
    ]);

    const totalPage = Math.ceil(total / pageSize);
    const nextPage = page < totalPage;
    const previousPage = page > 1;

    return HTTP_RESPONSE.OK('en', {
      items,
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
    body: CreateProductRequestDto,
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
