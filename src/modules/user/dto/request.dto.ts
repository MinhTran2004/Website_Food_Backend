/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
export class RegisterRequestDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 'test@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 'NORMAL', enum: Provider })
    @IsNotEmpty()
    @IsEnum(Provider)
    provider: Provider;
}

export class LoginRequestDto {
    @ApiProperty({ example: 'test@gmail.com', type: String })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '123456', type: String, minLength: 6 })
    @MinLength(6)
    password: string
}

export class LoginGoogleRequestDto {
    @ApiProperty({ required: true, type: String })
    @IsNotEmpty()
    idToken: string;

    @ApiProperty({ required: true, type: String })
    @IsNotEmpty()
    accessToken: string;

    @ApiProperty({ required: true, enum: Provider })
    @IsNotEmpty()
    provider: Provider
}

export class LoginFacebookRequestDto {
    @ApiProperty({ required: true, type: String })
    @IsNotEmpty()
    accessToken: string;

    @ApiProperty({ required: true, enum: Provider })
    @IsNotEmpty()
    provider: Provider
}