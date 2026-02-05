import { ApiProperty } from '@nestjs/swagger';
import { METHOD_PAYMENT } from 'src/model/order.model';
import { IProduct } from 'src/model/product.model';

export class CreateRequestDto {
  @ApiProperty({ required: true, type: String })
  idUser: string;

  @ApiProperty({ required: true, type: Array })
  product: IProduct[];

  @ApiProperty({ required: true, type: Number })
  total: number;

  @ApiProperty({ required: true, type: Number })
  address: number;

  @ApiProperty({ required: true, enum: METHOD_PAYMENT })
  method: string;
}
