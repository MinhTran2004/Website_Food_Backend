import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { HTTP_RESPONSE } from 'src/constants/api.constant';
import { IResponse } from 'src/model/api.model';
import { ICart } from 'src/model/cart.model';
import { Errors } from 'src/model/error';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { Cart, CartDocument } from './dto/schema.dto';
import { CreateRequestDto, UpdateRequestDto } from './dto/request.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async create(body: CreateRequestDto): Promise<IResponse<ICart | null>> {
    const { idProduct, idUser, quantity } = body;

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

    const cart = await this.cartModel.create(body);

    return HTTP_RESPONSE.OK('en', cart);
  }

  async delete(id: string): Promise<IResponse<ICart | null>> {
    const cart = await this.cartModel.findByIdAndDelete(id);
    if (!cart)
      throw new NotFoundException(Errors.ITEM_NOT_FOUND('Cart is not found'));

    return HTTP_RESPONSE.OK('en', cart);
  }

  async patch(body: UpdateRequestDto): Promise<IResponse<ICart | null>> {
    const { idCart, idProduct, idUser, quantity } = body;

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

  async findById(id: string) {
    return this.cartModel.findById(id);
  }
}
