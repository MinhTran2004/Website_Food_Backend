import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IFilterOptions } from 'src/commom/api.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CartService } from './cart.service';
import { CreateCartRequestDto, UpdateCartRequestDto } from './dto/request.dto';

@ApiTags('Cart')
@Controller('cart')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('')
  @ApiOperation({ summary: 'Add product to your cart' })
  create(@Req() req, @Body() body: CreateCartRequestDto) {
    const user = req.user;
    return this.cartService.create(body, user);
  }

  @Patch('')
  @ApiOperation({ summary: 'Update cart by id' })
  patch(@Req() req, @Body() body: UpdateCartRequestDto) {
    const user = req.user;
    return this.cartService.patch(body, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete cart by id' })
  delete(@Param('id') id: string) {
    return this.cartService.delete(id);
  }

  @Get('get-list-cart')
  @ApiOperation({ summary: 'Get list cart' })
  getListCart(@Query() query: IFilterOptions, @Req() req) {
    const user = req.user;
    return this.cartService.getListcart(query, user);
  }
}
