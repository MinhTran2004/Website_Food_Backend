/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './dto/schema.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    JwtModule,
    forwardRef(() => AuthModule), 
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService]
})
export class UserModule { }
