import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateRequestDto, UpdateRequestDto } from './dto/request.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('')
  @ApiOperation({ summary: 'Add product to your cart' })
  create(@Body() body: CreateRequestDto) {
    return this.cartService.create(body);
  }

  @Patch()
  @ApiOperation({summary: 'Update cart by id'})
  patch(@Body() body:UpdateRequestDto){
    return this.cartService.patch(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete cart by id' })
  delete(@Param('id') id: string) {
    return this.cartService.delete(id);
  }
}
