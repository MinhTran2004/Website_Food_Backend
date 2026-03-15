import { ApiProperty } from '@nestjs/swagger';

export class CreateChatRoomRequestDto {
  @ApiProperty({ required: true, type: String })
  receiverId: string;

  @ApiProperty({ required: true, type: Number })
  message: string;
}