import { Injectable } from '@nestjs/common';
import { CreateProductRequestDto } from './dto/request.dto';

@Injectable()
export class ProductService {
  async create(body: CreateProductRequestDto) {

  }
}
