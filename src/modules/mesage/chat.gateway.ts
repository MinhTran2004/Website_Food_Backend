import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { MessageService } from './mesage.service';
import { EventSubscribeMessages } from 'src/constants/socket.constant';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private messageService: MessageService) {}
  @SubscribeMessage(EventSubscribeMessages.CHAT_SEND)
  async handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    const accessToken = client.handshake.auth.token;
    await this.messageService.create(data, accessToken);
  }

  @SubscribeMessage(EventSubscribeMessages.ROOM_JOIN)
  async handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(roomId);
  }
}
