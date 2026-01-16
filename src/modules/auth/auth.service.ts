import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HTTP_RESPONSE } from 'src/constants/api.constant';

import { IResponseAuth, IUser } from 'src/model/user';
import { RegisterRequestDto } from '../user/dto/request.dto';
import { UserService } from '../user/user.service';
import { IResponse } from 'src/model/api.model';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async register(data: RegisterRequestDto): Promise<IResponse<IUser>> {
        return HTTP_RESPONSE.CREATED('en', this.userService.create(data))
    }

    async login(email: string, password): Promise<IResponseAuth> {
        const user = await this.userService.findByEmailForAuth(email)

        if (!user) throw new UnauthorizedException('Email not found')

        const match = await bcrypt.compare(password, user.password)

        if (match) throw new UnauthorizedException('Password not found')

        const payload = { id: user._id, email: user.email };

        return HTTP_RESPONSE.OK('en', {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user._id.toString(),
                email: user.email,
                username: user.username
            }
        })
    }
}
