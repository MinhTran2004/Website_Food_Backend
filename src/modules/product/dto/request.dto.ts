import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
  readonly comments: string;

  @ApiProperty()
  readonly rates: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly category_id: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly status: boolean;
}
