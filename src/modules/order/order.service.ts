import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFilterOptions } from 'src/commom/api.dto';
import { HTTP_RESPONSE } from 'src/constants/api.constant';
import { IResponse, IResponseListData } from 'src/model/api.model';
import { Errors } from 'src/model/error';
import { IOrder } from 'src/model/order.model';
import { IUserJWT } from 'src/model/user.modal';
import { CartService } from '../cart/cart.service';
import { UserService } from '../user/user.service';
import { CreateOrderRequestDto } from './dto/request.dto';
import { Order, OrderDocument } from './dto/schema.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    private userService: UserService,
    private cartService: CartService,
  ) {}

  async create(
    body: CreateOrderRequestDto,
    user: IUserJWT,
  ): Promise<IResponse<IOrder | null>> {
    const { address, paymentMethods, products, total } = body;
    const { idUser } = user;

    if (!address._id || !paymentMethods || !products || !total || !idUser)
      throw new BadRequestException(
        Errors.BAD_REQUEST(
          'idAddress, method, product, total, idUser is required',
        ),
      );

    const userExists = await this.userService.findById(idUser);

    if (!userExists)
      throw new NotFoundException(Errors.ITEM_NOT_FOUND('user is not found'));

    if (products.length === 0) {
      throw new BadRequestException(Errors.BAD_REQUEST('Minimum 1 product'));
    }

    const payload: IOrder = {
      user: {
        ...userExists,
        _id: userExists._id.toString(),
      },
      address: body.address,
      paymentMethods: body.paymentMethods,
      products: body.products,
      total: body.total,
    };

    const order = await this.orderModel.create(payload);

    const productIds = body.products
      .map((item) => item._id)
      .filter((id): id is string => Boolean(id));

    const hiddenCart = await this.cartService.patchMany(productIds, {
      isActive: false,
    });

    if (!hiddenCart)
      throw new BadRequestException(
        Errors.BAD_REQUEST('Remove product in cart failure'),
      );

    return HTTP_RESPONSE.CREATED('en', order);
  }

  async getListOrder(
    options: IFilterOptions,
    user: IUserJWT,
  ): Promise<IResponseListData<IOrder | null>> {
    const { idUser } = user;

    const page = Number(options.page) || 1;
    const pageSize = Number(options.pageSize) || 20;
    const skip = (page - 1) * pageSize;

    const userExists = await this.userService.findById(idUser);

    if (!userExists)
      throw new NotFoundException(Errors.ITEM_NOT_FOUND('User is not found'));

    const [items, total] = await Promise.all([
      this.orderModel
        .find({ 'user._id': idUser })
        .skip(skip)
        .limit(pageSize)
        .sort({ createAt: -1 })
        .lean(),
      this.orderModel.countDocuments({ 'user._id': idUser }),
    ]);

    const totalPage = Math.ceil(total / pageSize);
    const nextPage = page < totalPage;
    const previousPage = page > 1;

    return HTTP_RESPONSE.OK('en', {
      items: items,
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
    return this.orderModel.findById(id);
  }
}
