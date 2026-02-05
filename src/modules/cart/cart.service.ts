import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { HTTP_RESPONSE } from 'src/constants/api.constant';
import { IResponse, IResponseListData } from 'src/model/api.model';
import { ICart } from 'src/model/cart.model';
import { Errors } from 'src/model/error';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { Cart, CartDocument } from './dto/schema.dto';
import { CreateRequestDto, UpdateRequestDto } from './dto/request.dto';
import { IUserJWT } from 'src/model/user.modal';
import { IFilterOptions } from 'src/commom/api.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async create(
    body: CreateRequestDto,
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

    const productInCartExists = await this.cartModel.find({
      idUser: idUser,
      idProduct: idProduct,
      isActive: true,
    });

    if (productInCartExists.length > 0)
      throw new ConflictException(
        Errors.CONFLICT('Sản phẩm đã tồn tại trong giỏ hàng'),
      );

    const payload = {
      idUser,
      idProduct,
      quantity,
    };

    const cart = await this.cartModel.create(payload);

    return HTTP_RESPONSE.OK('en', cart);
  }

  async delete(id: string): Promise<IResponse<ICart | null>> {
    const cart = await this.cartModel.findByIdAndDelete(id);
    if (!cart)
      throw new NotFoundException(Errors.ITEM_NOT_FOUND('Cart is not found'));

    return HTTP_RESPONSE.OK('en', cart);
  }

  async patchQuantity(
    body: UpdateRequestDto,
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

    const cart = await this.cartModel.findByIdAndUpdate(
      idCart,
      { idProduct, idUser, quantity },
      {
        new: true,
      },
    );

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
      this.cartModel
        .find({ idUser: idUser, isActive: true })
        .populate('idProduct')
        .skip(skip)
        .limit(pageSize)
        .sort({ createAt: -1 })
        .lean(),
      this.cartModel.countDocuments({ idUser: idUser, isActive: true }),
    ]);

    const products = items.map(({ idProduct, ...rest }) => ({
      ...rest,
      product: idProduct,
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

  async findById(id: string) {
    return this.cartModel.findById(id);
  }
}
