import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressRequestDto, UpdateAddressRequestDto } from './dto/request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IFilterOptions } from 'src/commom/api.dto';

@ApiTags('Address')
@Controller('address')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create a address' })
  create(@Req() req, @Body() body: CreateAddressRequestDto) {
    const user = req.user;
    return this.addressService.create(body, user);
  }

  @Get('get-address-by-default')
  @ApiOperation({ summary: 'Create a address' })
  getAddressByDefault(@Req() req) {
    const user = req.user;
    return this.addressService.getAddressByDefault(user);
  }

  @Get('get-list-address')
  @ApiOperation({ summary: 'get list address' })
  getListAddress(@Req() req, @Query() query: IFilterOptions) {
    const user = req.user;
    return this.addressService.getListAddress(query, user);
  }

  @Patch()
  @ApiOperation({ summary: 'Update a address' })
  patch(@Req() req, @Body() body: UpdateAddressRequestDto) {
    const user = req.user;
    return this.addressService.patch(body, user);
  }
}
