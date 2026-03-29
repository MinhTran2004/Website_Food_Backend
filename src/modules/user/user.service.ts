import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Provider } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { HTTP_RESPONSE } from '../../constants/api.constant';
import { IResponse, IResponseListData } from '../../model/api.model';
import { BaseException, Errors } from '../../model/error';
import { IResponseAuth, IUser, IUserJWT } from '../../model/user.modal';
import { LoginRequestDto, RegisterRequestDto } from './dto/request.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(body: RegisterRequestDto): Promise<IResponse<IUser | null>> {
    const { password, ...account } = body;

    if (password.length < 6)
      throw new BaseException(
        Errors.BAD_REQUEST('Minimum password length is 6.'),
      );

    const existed = await this.prisma.user.findUnique({
      where: { email: account.email },
    });

    if (existed)
      throw new ConflictException(Errors.BAD_REQUEST('Email already exists'));

    const passwordHash = (await bcrypt.hash(password, 10)) as string;

    const userCreate = await this.prisma.user.create({
      data: {
        ...body,
        password: passwordHash,
      },
    });

    if (!userCreate) throw new BadRequestException('Create new user failure');

    return HTTP_RESPONSE.CREATED('en', userCreate);
  }

  async createUserProvider(body: {
    email: string;
    username: string;
    avatar: string;
    provider: Provider;
  }): Promise<IResponse<IUser | null>> {
    const user = await this.prisma.user.create({
      data: { password: '', ...body },
    });

    if (!user)
      throw new BadRequestException(
        Errors.BAD_REQUEST('Create new user failure'),
      );

    return HTTP_RESPONSE.CREATED('en', user);
  }

  async get(user: IUserJWT): Promise<IResponse<IUser | null>> {
    const { idUser } = user;
    if (!idUser)
      throw new BadRequestException(Errors.BAD_REQUEST('IdUser is required'));

    const userExists = await this.prisma.user.findUnique({
      where: { id: idUser },
    });

    return HTTP_RESPONSE.OK('en', userExists);
  }

  async findByEmailForAuth(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async existsByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async login(data: LoginRequestDto): Promise<IResponseAuth> {
    const { email, password } = data;

    // 1. Tìm user
    const user = await this.prisma.user.findUnique({ where: { email } });

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
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    // 4. Trả response
    return HTTP_RESPONSE.OK('en', {
      accessToken: accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  }

  async getListUserByUserName(
    userName: string,
    user: IUserJWT,
  ): Promise<IResponseListData<IUser>> {
    if (!userName)
      throw new ConflictException(Errors.CONFLICT('userName is required'));

    const users = await this.prisma.user.findMany({
      where: {
        username: {
          startsWith: userName, // giống ^regex
          mode: 'insensitive', // không phân biệt hoa thường
        },
        id: {
          not: user.idUser, // loại trừ chính mình
        },
      },
    });

    return HTTP_RESPONSE.OK('en', {
      items: users,
    });
  }
}
