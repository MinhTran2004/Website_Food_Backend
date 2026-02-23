import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderRequestDto } from './dto/request.dto';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IFilterOptions } from 'src/commom/api.dto';

@ApiTags('Order')
@Controller('order')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('payment-method-cod')
  @ApiOperation({ summary: 'Create new order' })
  create(@Body() body: CreateOrderRequestDto, @Req() req) {
    const user = req.user;
    return this.orderService.create(body, user);
  }

  @Get('get-list-order')
  @ApiOperation({summary: 'Get lsit order'})
  patch(@Req() req, @Query() options:IFilterOptions){
    const user = req.user;
    return this.orderService.getListOrder(options, user);
  }

}
