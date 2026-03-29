import { BadRequestException, Injectable } from '@nestjs/common';
import { HTTP_RESPONSE } from '../../constants/api.constant';
import {
  IBaseResponse,
  IResponse,
  IResponseListData,
} from '../../model/api.model';
import { Errors } from '../../model/error';
import { IProduct } from '../../model/product.model';
import { CreateProductRequestDto, FilterProductDto } from './dto/request.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

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

    const nameExisted = await this.prisma.product.findFirst({
      where: { name },
    });

    if (nameExisted) {
      return HTTP_RESPONSE.CONFLICT('en');
    }

    const product = await this.prisma.product.create({ data });
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
      filter.price = { lte: 50000 };
    } else if (options.price === 'MEDIUM') {
      filter.price = { gt: 50000, lte: 150000 };
    } else if (options.price === 'MAX') {
      filter.price = { gt: 150000 };
    }

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where: { ...filter },
        skip,
        take: pageSize,
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      }),
      this.prisma.product.count({
        where: { ...filter },
      }),
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
    const productDeleted = await this.prisma.product.delete({ where: { id } });

    if (!productDeleted) {
      return HTTP_RESPONSE.NOT_FOUND('en');
    }

    return HTTP_RESPONSE.OK('en', id);
  }

  async patch(
    id: string,
    body: CreateProductRequestDto,
  ): Promise<IResponse<IProduct | null>> {
    const productExists = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!productExists) {
      return HTTP_RESPONSE.NOT_FOUND('en');
    }

    const productUpdate = await this.prisma.product.update({
      where: { id },
      data: {
        ...body,
      },
    });
    return HTTP_RESPONSE.OK('en', productUpdate);
  }

  async findById(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }
}
