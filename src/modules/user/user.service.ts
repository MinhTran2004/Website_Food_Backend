import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { HTTP_RESPONSE } from 'src/constants/api.constant';
import { IResponse } from 'src/model/api.model';
import { BaseException, Errors } from 'src/model/error';
import { IUser, PROVIDER } from 'src/model/user.modal';
import { RegisterRequestDto } from './dto/request.dto';
import { User, UserDocument } from './dto/schema.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) { }

    async create(data: RegisterRequestDto): Promise<IResponse<IUser | null>> {
        const { password, ...account } = data;

        if (password.length < 6) throw new BaseException(Errors.BAD_REQUEST('Minimum password length is 6.'))

        const existed = await this.userModel.findOne({ email: account.email })

        if (existed) throw new ConflictException(Errors.BAD_REQUEST('Email already exists'));

        const passwordHash = await bcrypt.hash(password, 10);

        const userCreate = await this.userModel.create({
            ...data,
            password: passwordHash
        })

        if (!userCreate) throw new BadRequestException('Create new user failure')

        return HTTP_RESPONSE.CREATED('en',
            this.userModel.create({
                ...data,
                password: passwordHash,
                provider: PROVIDER.NORMAL
            }))
    }

    async findByEmailForAuth(email: string) {
        return this.userModel.findOne({ email }).select('+password');
    }

    async existsByEmail(email: string) {
        return this.userModel.exists({ email });
    }

    async findById(id: string) {
        return this.userModel.findById(id);
    }

    async createUserProvider(body: { email: string, username: string, avatar: string, provider: string }): Promise<IResponse<IUser | null>> {
        const user = await this.userModel.create(body);

        if (!user) throw new BadRequestException(Errors.BAD_REQUEST('Create new user failure'))

        return HTTP_RESPONSE.CREATED('en', user);
    }

    async createUserGoogle(body: { email: string, username: string, avatar: string, provider: string }): Promise<IResponse<IUser | null>> {
        const user = await this.userModel.create(body);

        if (!user) throw new BadRequestException(Errors.BAD_REQUEST('Create new user failure'))

        return HTTP_RESPONSE.CREATED('en', user);
    }

    async createUserFacebook(body: { email: string, username: string, avatar: string, provider: string }): Promise<IResponse<IUser | null>> {
        const user = await this.userModel.create(body);

        if (!user) throw new BadRequestException(Errors.BAD_REQUEST('Create new user failure'))

        return HTTP_RESPONSE.CREATED('en', user);
    }
}
