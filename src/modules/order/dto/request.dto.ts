import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {
  @ApiProperty({ required: true, type: String })
  idUser: string;

  @ApiProperty({ required: true, type: String })
  idProduct: string;

  @ApiProperty({ required: true, type: Number })
  quantity: number;
}

export class UpdateRequestDto extends CreateRequestDto {
  @ApiProperty({ required: true, type: String })
  idCart: string;
}
