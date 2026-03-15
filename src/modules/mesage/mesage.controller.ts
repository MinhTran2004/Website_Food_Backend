import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateChatRoomRequestDto } from './dto/request.dto';
import { MessageService } from './mesage.service';

@ApiTags('Message')
@Controller('message')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() body: CreateChatRoomRequestDto, @Req() req) {
    const { idUser } = req.user;
    return this.messageService.create(body, idUser);
  }

  @Get('/get-list-message-by-idReceiver/:idReceiver')
  getListMessageByIdReceiver(
    @Req() req,
    @Param('idReceiver') idReceiver: string,
  ) {
    const { idUser } = req.user;
    return this.messageService.getListMessageByIdReceiver(idUser, idReceiver);
  }

  @Get('get-list-room-user')
  getListRoomUser(@Req() req) {
    const { idUser } = req.user;
    return this.messageService.getListRoomUser(idUser);
  }
}
