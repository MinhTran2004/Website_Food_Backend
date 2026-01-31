/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './dto/schema.dto';
import { CreateBlogRequestDto } from './dto/request.dto';
import { Errors } from 'src/model/error';
import { IResponse } from 'src/model/api.model';
import { IBlog } from 'src/model/blog.model';
import { HTTP_RESPONSE } from 'src/constants/api.constant';

@Injectable()
export class BlogService {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) { }

    async create(body: CreateBlogRequestDto): Promise<IResponse<IBlog | null>> {
        const { contentHtml } = body;

        if (!contentHtml) throw new BadRequestException(Errors.BAD_REQUEST('contentHtml is null'));

        const blog = await this.blogModel.create(contentHtml);

        if (!blog) throw new BadRequestException(Errors.BAD_REQUEST('Create blog failure'))

        return HTTP_RESPONSE.CREATED('en', blog)
    }

}
