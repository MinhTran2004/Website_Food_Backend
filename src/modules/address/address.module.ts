/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address, AddressSchema } from './dto/schema.dto';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Address.name, schema: AddressSchema },
    ]),
  ],
  controllers: [AddressController],
  providers: [AddressService, PrismaService],
  exports: [AddressService]
})
export class AddressModule { }
