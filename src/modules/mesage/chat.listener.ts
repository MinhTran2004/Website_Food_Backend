import { Injectable } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { OnEvent } from '@nestjs/event-emitter';
import { IMessage, IRoom } from 'src/model/message.model';
import { OnEvents, SocketClientEvents } from 'src/constants/socket.constant';

// chat.listener.ts
@Injectable()
export class ChatListener {
  constructor(private gateway: ChatGateway) {}

  @OnEvent(OnEvents.CHAT_MESSAGE)
  handleMessage(payload: { room: IRoom; message: IMessage }) {
    const { message, room } = payload;
    this.gateway.server
      .to(room._id?.toString() as string)
      .emit('chat:new', message);
    this.gateway.server
      .to(room._id?.toString() as string)
      .emit('room:joinFristChat', room);
  }

  @OnEvent(OnEvents.ROOM_JOIN_FRIST_CHAT)
  reloadRooms(payload: {
    senderId;
    receiverId;
    room: IRoom;
    message: IMessage;
  }) {
    const { room, message, receiverId, senderId } = payload;
    this.gateway.server
      .to(senderId)
      .emit(SocketClientEvents.ROOM_JOIN_FRIST_CHAT, room);
    this.gateway.server
      .to(receiverId)
      .emit(SocketClientEvents.ROOM_JOIN_FRIST_CHAT, room);

    this.gateway.server
      .to(senderId)
      .emit(SocketClientEvents.NEW_MESSAGE, message);
    this.gateway.server
      .to(receiverId)
      .emit(SocketClientEvents.NEW_MESSAGE, message);
  }
}
