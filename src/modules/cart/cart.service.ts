import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { PrismaService } from 'prisma/prisma.service';
import { IFilterOptions } from 'src/commom/api.dto';
import { HTTP_RESPONSE } from 'src/constants/api.constant';
import { IResponse, IResponseListData } from 'src/model/api.model';
import { ICart } from 'src/model/cart.model';
import { Errors } from 'src/model/error';
import { IUserJWT } from 'src/model/user.modal';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { CreateCartRequestDto, UpdateCartRequestDto } from './dto/request.dto';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async create(
    body: CreateCartRequestDto,
    user: IUserJWT,
  ): Promise<IResponse<ICart | null>> {
    const { idProduct, quantity } = body;
    const { idUser } = user;

    if (!idProduct || !idUser)
      throw new BadRequestException(
        Errors.BAD_REQUEST('idProduct and idUser are required'),
      );

    if (!quantity || quantity <= 0 || !Number.isInteger(quantity))
      throw new BadRequestException('Quantity must be a positive integer');

    const userExists = await this.userService.findById(idUser);

    if (!userExists)
      throw new NotFoundException(Errors.ITEM_NOT_FOUND('user is not found'));

    const productExists = await this.productService.findById(idProduct);
    if (!productExists)
      throw new NotFoundException(
        Errors.ITEM_NOT_FOUND('idProduct is not found'),
      );

    const productInCartExists = await this.prisma.cart.findFirst({
      where: {
        idUser: idUser,
        idProduct: idProduct,
        isActive: true,
      },
    });

    if (productInCartExists)
      throw new ConflictException(
        Errors.CONFLICT('Sản phẩm đã tồn tại trong giỏ hàng'),
      );

    const data = {
      idUser,
      idProduct,
      quantity,
    };

    const cart = await this.prisma.cart.create({ data });

    return HTTP_RESPONSE.OK('en', cart);
  }

  async delete(id: string): Promise<IResponse<ICart | null>> {
    const cart = await this.prisma.cart.delete({ where: { id } });
    if (!cart)
      throw new NotFoundException(Errors.ITEM_NOT_FOUND('Cart is not found'));

    return HTTP_RESPONSE.OK('en', cart);
  }

  async patchMany(ids: string[], body?: Partial<ICart>) {
    return this.prisma.cart.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        ...body,
      },
    });
  }

  async patch(
    body: UpdateCartRequestDto,
    user: IUserJWT,
  ): Promise<IResponse<ICart | null>> {
    const { idCart, idProduct, quantity } = body;
    const { idUser } = user;

    if (!idCart || !idProduct || !idUser)
      throw new BadRequestException(
        Errors.BAD_REQUEST('idCart, idProduct and idUser are required'),
      );

    if (
      !mongoose.Types.ObjectId.isValid(idCart) ||
      !mongoose.Types.ObjectId.isValid(idProduct) ||
      !mongoose.Types.ObjectId.isValid(idUser)
    )
      throw new BadRequestException(Errors.BAD_REQUEST('Invalid ObjectId'));

    if (!quantity || quantity <= 0 || !Number.isInteger(quantity))
      throw new BadRequestException('Quantity must be a positive integer');

    const userExists = await this.userService.findById(idUser);
    if (!userExists)
      throw new NotFoundException(Errors.ITEM_NOT_FOUND('user is not found'));

    const productExists = await this.productService.findById(idProduct);
    if (!productExists)
      throw new NotFoundException(
        Errors.ITEM_NOT_FOUND('idProduct is not found'),
      );

    const cart = await this.prisma.cart.update({
      where: { id: idCart },
      data: { ...body },
    });

    if (!cart)
      throw new NotFoundException(Errors.ITEM_NOT_FOUND('Cart is not found'));

    return HTTP_RESPONSE.OK('en', cart);
  }

  async getListcart(
    options: IFilterOptions,
    user: IUserJWT,
  ): Promise<IResponseListData<ICart | null>> {
    const { idUser } = user;

    const page = Number(options.page) || 1;
    const pageSize = Number(options.pageSize) || 20;
    const skip = (page - 1) * pageSize;

    const userExists = await this.userService.findById(idUser);

    if (!userExists)
      throw new NotFoundException(Errors.ITEM_NOT_FOUND('User is not found'));

    const [items, total] = await Promise.all([
      this.prisma.cart.findMany({
        where: { idUser: idUser, isActive: true },
        include: { product: true },
        skip,
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      }),

      this.prisma.cart.count({ where: { idUser: idUser, isActive: true } }),
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

  async findById(id: string) {
    return this.prisma.cart.findUnique({ where: { id } });
  }
}
