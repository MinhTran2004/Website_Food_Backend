import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoginRequestDto, RegisterRequestDto } from './dto/request.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly accountService: UserService) { }

  @Post('login')
  @ApiBody({type: LoginRequestDto})
  @ApiOperation({ summary: 'Login account' })
  async login(@Body() body:LoginRequestDto) {
    return this.accountService.login(body);
  }

  @Post('register')
  @ApiOperation({ summary: 'Create new account' })
  async regester(@Body() body: RegisterRequestDto) {
    return this.accountService.create(body);
  }
}
