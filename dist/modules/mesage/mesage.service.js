"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const api_constant_1 = require("../../constants/api.constant");
const error_1 = require("../../model/error");
const user_service_1 = require("../user/user.service");
const schema_dto_1 = require("./dto/schema.dto");
const event_emitter_1 = require("@nestjs/event-emitter");
let MessageService = class MessageService {
    chatModel;
    messageModel;
    jwtService;
    userService;
    eventEmitter;
    constructor(chatModel, messageModel, jwtService, userService, eventEmitter) {
        this.chatModel = chatModel;
        this.messageModel = messageModel;
        this.jwtService = jwtService;
        this.userService = userService;
        this.eventEmitter = eventEmitter;
    }
    async create(data, accessToken) {
        const { receiverId, message } = data;
        if (!receiverId)
            throw new common_1.ConflictException(error_1.Errors.CONFLICT('receiverId is required'));
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
        }
        else {
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
    async findOrCreateRoom(senderId, receiverId, message) {
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
            return api_constant_1.HTTP_RESPONSE.OK('en', room);
        }
        const newRoom = await this.chatModel.create({
            members: [senderId, receiverId],
        });
        return api_constant_1.HTTP_RESPONSE.OK('en', newRoom);
    }
    async getRoom(idUser, senderId) {
        const room = await this.chatModel.findOne({
            members: { $all: [idUser, senderId] },
        });
        return api_constant_1.HTTP_RESPONSE.OK('en', room);
    }
    async getListMessageByIdReceiver(idUser, idReceiver) {
        const room = await this.getRoom(idUser, idReceiver);
        const user = await this.userService.findById(idReceiver);
        const messages = await this.messageModel.find({
            roomId: room.data?._id,
        });
        if (!user)
            throw new common_1.ConflictException(error_1.Errors.CONFLICT('user is empty'));
        const formatUser = { ...user.toObject(), _id: user?._id.toString() };
        const payload = {
            user: formatUser,
            messages: messages,
            room: room.data,
        };
        return api_constant_1.HTTP_RESPONSE.OK('en', payload);
    }
    async getListRoomUser(idUser) {
        const listRooms = await this.chatModel
            .find({
            members: idUser,
        })
            .sort({ updatedAt: -1 });
        if (listRooms.length == 0)
            return api_constant_1.HTTP_RESPONSE.OK('en', { items: [] });
        const filterUserReceiver = await Promise.all(listRooms.map((item) => {
            return item.members.filter((i) => i !== idUser);
        })[0]);
        const listUser = await Promise.all(filterUserReceiver.map(async (item) => {
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
        }));
        return api_constant_1.HTTP_RESPONSE.OK('en', {
            items: listUser,
        });
    }
    async findAll() {
        return this.messageModel.find().sort({ createdAt: 1 });
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_dto_1.Chat.name)),
    __param(1, (0, mongoose_1.InjectModel)(schema_dto_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        user_service_1.UserService,
        event_emitter_1.EventEmitter2])
], MessageService);
