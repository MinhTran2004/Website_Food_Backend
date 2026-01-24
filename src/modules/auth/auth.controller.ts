import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginGoogleRequestDto, LoginRequestDto, RegisterRequestDto } from '../user/dto/request.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    @Post('login')
    @ApiBody({ type: LoginRequestDto })
    @ApiOperation({ summary: 'Login account' })
    async login(@Body() body: LoginRequestDto) {
        return this.authService.login(body);
    }

    @Post('register')
    @ApiOperation({ summary: 'Create new account' })
    async regester(@Body() body: RegisterRequestDto) {
        return this.userService.create(body);
    }

    @Post('login-google')
    @ApiOperation({ summary: "Login with google" })
    async loginGoogle(@Body() body: LoginGoogleRequestDto) {
        return this.authService.loginGoogle(body);
    }

    @Post('login-facebook')
    @ApiOperation({ summary: "Login with facebook" })
    async loginFacebook(@Body() body: LoginGoogleRequestDto) {
        return this.authService.loginFacebook(body);
    }
}
