import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateProductRateRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly product_id: string;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rate: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly comment: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly status: boolean;
}
