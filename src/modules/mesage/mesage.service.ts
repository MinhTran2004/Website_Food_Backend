import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HTTP_RESPONSE } from 'src/constants/api.constant';
import { IResponse, IResponseListData } from 'src/model/api.model';
import { Errors } from 'src/model/error';
import {
  IMessage,
  IMessageFirstRoom,
  IRoom,
  IRoomAndMessage,
} from 'src/model/message.model';
import { UserService } from '../user/user.service';
import { CreateChatRoomRequestDto } from './dto/request.dto';
import { Chat, ChatDocument, Message, MessageDocument } from './dto/schema.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,

    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
    private jwtService: JwtService,
    private userService: UserService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(data: CreateChatRoomRequestDto, accessToken: string) {
    const { receiverId, message } = data;

    if (!receiverId)
      throw new ConflictException(Errors.CONFLICT('receiverId is required'));

    const { id } = await this.jwtService.verify(accessToken);

    const roomChat = await this.chatModel.findOne({
      members: { $all: [id, receiverId] },
    });
    
    if (roomChat) {
      const payloadNewMessage = {
        roomId: roomChat._id,
        senderId: id,
        message: message,
      };
      const newMessage = await this.messageModel.create(payloadNewMessage);
      const payload = {
        room: roomChat,
        message: newMessage,
      };
      this.eventEmitter.emit('chat.message', payload);

      return newMessage;
    } else {
      const payloadNewRoom = [id, receiverId];
      const newRoom = await this.chatModel.create({ members: payloadNewRoom });

      const payloadNewMessage = {
        roomId: newRoom._id,
        senderId: id,
        message: message,
      };

      const newMessage = await this.messageModel.create(payloadNewMessage);

      const payload = {
        senderId: id,
        receiverId: receiverId,
        room: newRoom,
        message: newMessage,
      };

      this.eventEmitter.emit('chat.reloadRooms', payload);

      return newMessage;
    }
  }

  async findOrCreateRoom(
    senderId: string,
    receiverId: string,
    message: string,
  ): Promise<IResponse<IRoom | null>> {
    const room = await this.chatModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (room) {
      const payload = {
        message,
        roomId: room?.id,
        isFirstTime: false,
        receiverId: receiverId,
      };
      this.eventEmitter.emit('chat.message', payload);
      return HTTP_RESPONSE.OK('en', room);
    }

    const newRoom = await this.chatModel.create({
      members: [senderId, receiverId],
    });

    return HTTP_RESPONSE.OK('en', newRoom);
  }

  async getRoom(
    idUser: string,
    senderId: string,
  ): Promise<IResponse<IRoom | null>> {
    const room = await this.chatModel.findOne({
      members: { $all: [idUser, senderId] },
    });

    return HTTP_RESPONSE.OK('en', room);
  }

  async getListMessageByIdReceiver(
    idUser: string,
    idReceiver: string,
  ): Promise<IResponse<IRoomAndMessage | null>> {
    const room = await this.getRoom(idUser, idReceiver);
    const user = await this.userService.findById(idReceiver);
    const messages = await this.messageModel.find({
      roomId: room.data?._id,
    });

    if (!user) throw new ConflictException(Errors.CONFLICT('user is empty'));

    const formatUser = { ...user.toObject(), _id: user?._id.toString() };

    const payload: IRoomAndMessage = {
      user: formatUser,
      messages: messages,
      room: room.data,
    };

    return HTTP_RESPONSE.OK('en', payload);
  }

  async getListRoomUser(
    idUser: string,
  ): Promise<IResponseListData<IMessageFirstRoom>> {
    const listRooms = await this.chatModel
      .find({
        members: idUser,
      })
      .sort({ updatedAt: -1 });

    if (listRooms.length == 0) return HTTP_RESPONSE.OK('en', { items: [] });

    const filterUserReceiver = await Promise.all(
      listRooms.map((item) => {
        return item.members.filter((i) => i !== idUser);
      })[0],
    );

    const listUser = await Promise.all(
      filterUserReceiver.map(async (item) => {
        const user = await this.userService.findById(item);

        if (user) {
          const room = await this.getRoom(idUser, user._id.toString());
          const lastChat = await this.messageModel
            .findOne({
              roomId: room.data?._id,
            })
            .sort({ createdAt: -1 });

          return {
            user: user,
            message: lastChat,
          };
        }
      }),
    );

    return HTTP_RESPONSE.OK('en', {
      items: listUser,
    });
  }

  async findAll() {
    return this.messageModel.find().sort({ createdAt: 1 });
  }
}
