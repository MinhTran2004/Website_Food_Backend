/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { IFilterOptions } from 'src/commom/api.dto';
import { ProductService } from './product.service';
import { CreateProductRequestDto } from './dto/request.dto';

// @ApiBearerAuth('access-token')
// @UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  @ApiOperation({ summary: 'Create new product' })
  create(@Body() body: CreateProductRequestDto) {
    return this.productService.create(body);
  }

  @Get('get-list-product')
  getListProduct(@Query() options: IFilterOptions) {
    return this.productService.getListProduct(options);
  }

  @Get('get-product-by-id/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  patch(@Param('id') id: string, @Body() body: CreateProductRequestDto) {
    return this.productService.patch(id, body);
  }
}
