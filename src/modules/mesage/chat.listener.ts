import { Injectable } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { OnEvent } from '@nestjs/event-emitter';
import { IMessage, IRoom } from 'src/model/message.model';

// chat.listener.ts
@Injectable()
export class ChatListener {
  constructor(private gateway: ChatGateway) {}

  @OnEvent('chat.message')
  handleMessage(payload: { room: IRoom; message: IMessage }) {
    const { message, room } = payload;
    this.gateway.server.to(room._id?.toString() as string).emit('newMessage', message);
    this.gateway.server.to(room._id?.toString() as string).emit('reloadRooms', room);
  }

  @OnEvent('chat.reloadRooms')
  reloadRooms(payload: {
    senderId;
    receiverId;
    room: IRoom;
    message: IMessage;
  }) {
    const { room, message, receiverId, senderId } = payload;
    this.gateway.server.to(senderId).emit('reloadRooms', room);
    this.gateway.server.to(receiverId).emit('reloadRooms', room);

    this.gateway.server.to(senderId).emit('newMessage', message);
    this.gateway.server.to(receiverId).emit('newMessage', message);
  }
}
