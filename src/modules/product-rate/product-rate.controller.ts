import { Body, Controller, Post } from '@nestjs/common';
import { ProductRateService } from './product-rate.service';
import { ApiOperation } from '@nestjs/swagger';
import { ProductRateRequestDto } from './dto/request.dto';

@Controller('product-rate')
export class ProductRateController {
    constructor(private productRateService: ProductRateService) { }

    @Post()
    @ApiOperation({ summary: 'Create product rate' })
    create(@Body() body: ProductRateRequestDto) {
        return this.productRateService.create(body)
    }
}
