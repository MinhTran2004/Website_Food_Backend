import { ApiProperty } from '@nestjs/swagger';

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
