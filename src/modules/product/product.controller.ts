import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateProductRequestDto } from './dto/request.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('product')
  @ApiOperation({ summary: 'Create new Product' })
  create(@Body() body: CreateProductRequestDto) {
    return this.productService.create(body)
  }
}
