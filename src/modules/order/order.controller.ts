import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRequestDto, UpdateRequestDto } from './dto/request.dto';
import { OrderService } from './order.service';

@ApiTags('Cart')
@Controller('cart')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @Post('')
  // @ApiOperation({ summary: 'Add product to your cart' })
  // create(@Body() body: CreateRequestDto) {
  //   return this.orderService.create(body);
  // }

  // @Patch()
  // @ApiOperation({summary: 'Update cart by id'})
  // patch(@Body() body:UpdateRequestDto){
  //   return this.orderService.patch(body);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete cart by id' })
  // delete(@Param('id') id: string) {
  //   return this.orderService.delete(id);
  // }
}
