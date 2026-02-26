/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IFilterOptions } from 'src/commom/api.dto';
import { CATEGORY_PRODUCT, FILTER_PRICE } from 'src/model/product.model';

export class CreateProductRequestDto {
  @ApiProperty({ example: 'Hamburger' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 50000 })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  readonly discount: number;

  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty({ enum: CATEGORY_PRODUCT })
  @IsNotEmpty()
  readonly category: CATEGORY_PRODUCT;
}

export class ProductRequestDto extends CreateProductRequestDto {
  _id: string;
}

export class FilterProductDto extends IFilterOptions {
  @ApiProperty({ enum: CATEGORY_PRODUCT })
  @IsNotEmpty()
  readonly category: CATEGORY_PRODUCT;

  @ApiProperty({ enum: FILTER_PRICE })
  @IsNotEmpty()
  readonly price: FILTER_PRICE;
}
