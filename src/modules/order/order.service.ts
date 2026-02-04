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
import { CreateRequestDto, UpdateRequestDto } from './dto/request.dto';
import { Order, OrderDocument } from './dto/schema.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private cartModel: Model<OrderDocument>,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async findById(id: string) {
    return this.cartModel.findById(id);
  }
}
