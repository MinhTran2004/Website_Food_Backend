import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {
  @ApiProperty({ required: true, type: String })
  idProduct: string;

  @ApiProperty({ required: true, type: Number })
  quantity: number;

  @ApiProperty({ required: true, type: Boolean, default: true })
  isActive: boolean;
}

export class UpdateRequestDto extends CreateRequestDto {
  @ApiProperty({ required: true, type: String })
  idCart: string;
}
