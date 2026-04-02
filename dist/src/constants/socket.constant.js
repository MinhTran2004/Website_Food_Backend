"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketClientEvents = exports.OnEvents = exports.EventSubscribeMessages = void 0;
exports.EventSubscribeMessages = {
    CHAT_SEND: 'chat:send',
    ROOM_JOIN: 'room:join',
};
exports.OnEvents = {
    CHAT_MESSAGE: 'chat.newMessage',
    ROOM_JOIN_FRIST_CHAT: 'chat.joinRoomFristChat',
};
exports.SocketClientEvents = {
    NEW_MESSAGE: 'chat:new',
    ROOM_JOIN_FRIST_CHAT: 'room:joinFristChat',
};
