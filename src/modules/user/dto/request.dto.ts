import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

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
