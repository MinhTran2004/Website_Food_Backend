import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiOperation({ summary: 'Get profile user' })
  get(@Req() req) {
    const user = req.user;
    return this.userService.get(user);
  }

  @Get('get-list-user-by-username')
  @ApiOperation({ summary: 'Get list user' })
  getListUserByUserName(@Query('userName') userName: string, @Req() req) {
    const user = req.user;
    return this.userService.getListUserByUserName(userName, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get profile user' })
  getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
