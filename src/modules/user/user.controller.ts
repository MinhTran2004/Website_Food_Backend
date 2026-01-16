import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto, RegisterRequestDto } from './dto/request.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly accountService: UserService) { }

  @Post('login')
  @ApiBody({ type: LoginRequestDto })
  @ApiOperation({ summary: 'Login account' })
  async login(@Body() body: LoginRequestDto) {
    return this.accountService.login(body);
  }

  @Post('register')
  @ApiOperation({ summary: 'Create new account' })
  async regester(@Body() body: RegisterRequestDto) {
    return this.accountService.create(body);
  }
}
