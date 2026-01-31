/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BlogService } from './blog.service';
import { CreateBlogRequestDto } from './dto/request.dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('')
  @ApiOperation({ summary: 'Create new blog' })
  create(@Body() body: CreateBlogRequestDto) {
    return this.blogService.create(body);
  }
}
