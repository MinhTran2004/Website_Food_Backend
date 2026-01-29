/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IFilterOptions } from 'src/commom/api.dto';
import { ProductRequestDto } from './dto/request.dto';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  @ApiOperation({ summary: 'Create new product' })
  create(@Body() body: ProductRequestDto) {
    return this.productService.create(body);
  }

  @Get('get-list-product')
  getListProduct(@Query() options: IFilterOptions) {
    return this.productService.getListProduct(options);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  patch(@Param('id') id: string, @Body() body: ProductRequestDto) {
    return this.productService.patch(id, body);
  }

}
