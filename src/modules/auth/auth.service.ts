import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequestDto } from '../user/dto/request.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { IResponseAuth } from 'src/model/user';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async register(data: RegisterRequestDto) {
        return this.userService.create(data)
    }

    async login(email: string, password): Promise<IResponseAuth> {
        const user = await this.userService.findByEmailForAuth(email)

        if (!user) throw new UnauthorizedException('Email not found')

        const match = await bcrypt.compare(password, user.password)

        if (match) throw new UnauthorizedException('Password not found')

        const payload = { id: user._id, email: user.email };

        return {
            status: 200,
            messenger: 'Login successful',
            data: {
                accessToken: this.jwtService.sign(payload),
                user: {
                    id: user._id.toString(),
                    email: user.email,
                    username: user.username
                }
            }
        }
    }
}
