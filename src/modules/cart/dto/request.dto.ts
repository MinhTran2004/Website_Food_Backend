import { ApiProperty } from '@nestjs/swagger';
import { ProductRequestDto } from 'src/modules/product/dto/request.dto';

export class CreateCartRequestDto {
  @ApiProperty({ required: true, type: String })
  idProduct: string;

  @ApiProperty({ required: true, type: Number })
  quantity: number;

  @ApiProperty({ required: true, type: Boolean, default: true })
  isActive: boolean;
}

export class UpdateCartRequestDto extends CreateCartRequestDto {
  @ApiProperty({ required: true, type: String })
  idCart: string;
}

export class CartProductRequestDto {
  @ApiProperty({ required: true, type: String })
  idCart: string;

  @ApiProperty({ required: true, type: ProductRequestDto })
  product: ProductRequestDto;

  @ApiProperty({ required: true, type: Number })
  quantity: number;

  @ApiProperty({ required: true, type: Boolean, default: true })
  isActive: boolean;
}
