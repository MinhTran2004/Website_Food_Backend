/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateAddressRequestDto {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  nameAddress: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  addressDetail: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  district: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  city: string;
}

export class UpdateAddressRequestDto extends CreateAddressRequestDto {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  _id: string;

  @ApiProperty({ required: true, type: Boolean })
  @IsNotEmpty()
  isDefault: boolean;
}
