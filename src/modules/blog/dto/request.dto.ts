/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsString } from "class-validator";

export class CreateBlogRequestDto {
    @ApiProperty()
    @IsString()
    @IsEmpty()
    contentHtml: string
}