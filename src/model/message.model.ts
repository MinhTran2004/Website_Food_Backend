import { Types } from 'mongoose';
import { IUser } from './user.modal';


export interface IMessage {
  _id?: Types.ObjectId;
  roomId: Types.ObjectId;
  senderId: Types.ObjectId;
  message: string;
  isAcive?: boolean;
}

export interface IRoom {
  _id?: Types.ObjectId;
  members: string[];
  isActive: boolean;
}

export interface IRoomAndMessage {
  user: IUser,
  room: IRoom | null;
  messages: IMessage[] | [],
}

export interface IMessageFirstRoom {
  user: IUser;
  message: IMessage;
}
