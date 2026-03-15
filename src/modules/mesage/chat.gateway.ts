import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { MessageService } from './mesage.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private messageService: MessageService) {}
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    
    const accessToken = client.handshake.auth.token;
    const savedMessage = await this.messageService.create(data, accessToken);
      
    this.server
      .to(savedMessage.roomId.toString())
      .emit('newMessage', savedMessage);

    return savedMessage;
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(roomId);
  }
}
