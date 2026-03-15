"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../user/user.module");
const chat_gateway_1 = require("./chat.gateway");
const schema_dto_1 = require("./dto/schema.dto");
const mesage_controller_1 = require("./mesage.controller");
const mesage_service_1 = require("./mesage.service");
const auth_module_1 = require("../auth/auth.module");
let MessageModule = class MessageModule {
};
exports.MessageModule = MessageModule;
exports.MessageModule = MessageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            jwt_1.JwtModule,
            user_module_1.UserModule,
            mongoose_1.MongooseModule.forFeature([
                { name: schema_dto_1.Message.name, schema: schema_dto_1.MessageSchema },
                { name: schema_dto_1.Chat.name, schema: schema_dto_1.ChatSchema },
            ]),
        ],
        controllers: [mesage_controller_1.MessageController],
        providers: [mesage_service_1.MessageService, chat_gateway_1.ChatGateway],
        exports: [mesage_service_1.MessageService],
    })
], MessageModule);
