/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { HTTP_RESPONSE } from 'src/constants/api.constant';
import { IResponse } from 'src/model/api.model';
import { BaseException, Errors } from 'src/model/error';
import { IResponseAuth, IUser, IUserJWT } from 'src/model/user.modal';
import { LoginRequestDto, RegisterRequestDto } from './dto/request.dto';
import { User, UserDocument } from './dto/schema.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async create(data: RegisterRequestDto): Promise<IResponse<IUser | null>> {
    const { password, ...account } = data;

    if (password.length < 6)
      throw new BaseException(
        Errors.BAD_REQUEST('Minimum password length is 6.'),
      );

    const existed = await this.userModel.findOne({ email: account.email });

    if (existed)
      throw new ConflictException(Errors.BAD_REQUEST('Email already exists'));

    const passwordHash = (await bcrypt.hash(password, 10)) as string;

    const userCreate = await this.userModel.create({
      ...data,
      password: passwordHash,
    });

    if (!userCreate) throw new BadRequestException('Create new user failure');

    return HTTP_RESPONSE.CREATED('en', userCreate);
  }

  async get(user: IUserJWT): Promise<IResponse<IUser | null>> {
    const { idUser } = user;
    if (!idUser)
      throw new BadRequestException(Errors.BAD_REQUEST('IdUser is required'));

    const userExists = await this.userModel.findById(idUser);

    return HTTP_RESPONSE.OK('en', userExists);
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

  async createUserProvider(body: {
    email: string;
    username: string;
    avatar: string;
    provider: string;
  }): Promise<IResponse<IUser | null>> {
    const user = await this.userModel.create(body);

    if (!user)
      throw new BadRequestException(
        Errors.BAD_REQUEST('Create new user failure'),
      );

    return HTTP_RESPONSE.CREATED('en', user);
  }

  async createUserGoogle(body: {
    email: string;
    username: string;
    avatar: string;
    provider: string;
  }): Promise<IResponse<IUser | null>> {
    const user = await this.userModel.create(body);

    if (!user)
      throw new BadRequestException(
        Errors.BAD_REQUEST('Create new user failure'),
      );

    return HTTP_RESPONSE.CREATED('en', user);
  }

  async createUserFacebook(body: {
    email: string;
    username: string;
    avatar: string;
    provider: string;
  }): Promise<IResponse<IUser | null>> {
    const user = await this.userModel.create(body);

    if (!user)
      throw new BadRequestException(
        Errors.BAD_REQUEST('Create new user failure'),
      );

    return HTTP_RESPONSE.CREATED('en', user);
  }

  async login(data: LoginRequestDto): Promise<IResponseAuth> {
    const { email, password } = data;

    // 1. Tìm user
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException(
        Errors.UNAUTHORIZED('Email or password is incorrect'),
      );
    }

    // 2. So sánh password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException(
        Errors.UNAUTHORIZED('Email or password is incorrect'),
      );
    }

    // 3. Tạo JWT
    const payload = {
      sub: user._id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);
    console.log({
      accessToken: accessToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
      },
    });

    // 4. Trả response
    return HTTP_RESPONSE.OK('en', {
      accessToken: accessToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
      },
    });
  }
}
