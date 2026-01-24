import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { STAR } from 'src/model/product-rate.modal';

export class ProductRateRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly product_id: string;

  @ApiProperty({ example: 5, enum: STAR })
  @IsNotEmpty()
  @IsNumber()
  readonly rate: STAR;

  @ApiProperty()
  @IsNotEmpty()
  readonly comment: string;
}
