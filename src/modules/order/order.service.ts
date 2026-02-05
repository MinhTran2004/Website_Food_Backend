import {
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { Order, OrderDocument } from './dto/schema.dto';
import { CreateRequestDto } from './dto/request.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private cartModel: Model<OrderDocument>,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async create (body: CreateRequestDto){
    
  }

  async findById(id: string) {
    return this.cartModel.findById(id);
  }
}
