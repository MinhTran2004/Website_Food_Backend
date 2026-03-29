import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IFilterOptions } from '../../commom/api.dto';
import { HTTP_RESPONSE } from '../../constants/api.constant';
import { IResponse, IResponseListData } from '../../model/api.model';
import { Errors } from '../../model/error';
import { IOrder } from '../../model/order.model';
import { IUserJWT } from '../../model/user.modal';
import { CartService } from '../cart/cart.service';
import { UserService } from '../user/user.service';
import { CreateOrderRequestDto } from './dto/request.dto';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private cartService: CartService,
  ) {}

  async create(
    body: CreateOrderRequestDto,
    user: IUserJWT,
  ): Promise<IResponse<IOrder | null>> {
    const { address, paymentMethods, cartItems, total } = body;
    const { idUser } = user;

    if (!address || !paymentMethods || !cartItems || !total || !idUser)
      throw new BadRequestException(
        Errors.BAD_REQUEST(
          'idAddress, method, product, total, idUser is required',
        ),
      );

    const userExists = await this.userService.findById(idUser);

    if (!userExists)
      throw new NotFoundException(Errors.ITEM_NOT_FOUND('user is not found'));

    if (cartItems.length === 0) {
      throw new BadRequestException(Errors.BAD_REQUEST('Minimum 1 product'));
    }
    
    const payload = {
      idUser: userExists.id,
      user: userExists,
      address: { ...body.address },
      paymentMethods: body.paymentMethods,
      cartItems: cartItems.map((item) => ({
        id: item.id,
        idCart: item.idCart,
        quantity: item.quantity,
        isActive: item.isActive,
        product: {
          ...item.product,
        },
      })),
      total: body.total,
    };

    const order = await this.prisma.order.create({ data: payload });

    const productIds = body.cartItems
      .map((item) => item.id)
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
      this.prisma.order.findMany({
        where: { idUser },
        skip,
        take: pageSize,
        orderBy: [{ createdAt: 'desc' }],
      }),
      this.prisma.order.count({ where: { idUser } }),
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
    return this.prisma.order.findUnique({ where: { id } });
  }
}
