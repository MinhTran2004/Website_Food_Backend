/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { ChatGateway } from './chat.gateway';
import { Chat, ChatSchema, Message, MessageSchema } from './dto/schema.dto';
import { MessageController } from './mesage.controller';
import { MessageService } from './mesage.service';
import { AuthModule } from '../auth/auth.module';
import { ChatListener } from './chat.listener';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    JwtModule,
    UserModule,
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Chat.name, schema: ChatSchema },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService, ChatGateway, ChatListener, PrismaService],
  exports: [MessageService],
})
export class MessageModule {}
