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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatListener = void 0;
const common_1 = require("@nestjs/common");
const chat_gateway_1 = require("./chat.gateway");
const event_emitter_1 = require("@nestjs/event-emitter");
let ChatListener = class ChatListener {
    gateway;
    constructor(gateway) {
        this.gateway = gateway;
    }
    handleMessage(payload) {
        const { message, room } = payload;
        this.gateway.server.to(room._id?.toString()).emit('newMessage', message);
        this.gateway.server.to(room._id?.toString()).emit('reloadRooms', room);
    }
    reloadRooms(payload) {
        const { room, message, receiverId, senderId } = payload;
        this.gateway.server.to(senderId).emit('reloadRooms', room);
        this.gateway.server.to(receiverId).emit('reloadRooms', room);
        this.gateway.server.to(senderId).emit('newMessage', message);
        this.gateway.server.to(receiverId).emit('newMessage', message);
    }
};
exports.ChatListener = ChatListener;
__decorate([
    (0, event_emitter_1.OnEvent)('chat.message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatListener.prototype, "handleMessage", null);
__decorate([
    (0, event_emitter_1.OnEvent)('chat.reloadRooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatListener.prototype, "reloadRooms", null);
exports.ChatListener = ChatListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chat_gateway_1.ChatGateway])
], ChatListener);
