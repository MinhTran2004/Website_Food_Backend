import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { IResponseAuth } from 'src/model/user';
import { LoginRequestDto, RegisterRequestDto } from './dto/request.dto';
import { User, UserDocument } from './dto/schema.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) { }

    async create(data: RegisterRequestDto) {
        const existed = await this.userModel.findOne({ email: data.email })

        if (existed) throw new ConflictException('Email already exists');

        const passwordHash = await bcrypt.hash(data.password, 10);

        return this.userModel.create({
            ...data,
            password: passwordHash
        })
    }

    async login(body: LoginRequestDto): Promise<IResponseAuth> {
        const { email, password } = body;

        const user = await this.findByEmailForAuth(email)
        
        if (!user) throw new UnauthorizedException('Email not found')

        const match = await bcrypt.compare(password, user.password)
        
        if (!match) throw new UnauthorizedException('Incorrect password')

        const payload = { id: user._id, email: user.email };

        return {
            status: 200,
            messenger: 'Login successful',
            data: {
                accessToken: await this.jwtService.signAsync(payload),
                user: {
                    id: user._id.toString(),
                    email: user.email,
                    username: user.username
                }
            }
        }
    }

    async findByEmailForAuth(email: string) {
        return this.userModel.findOne({ email }).select('+password');
    }

    async existsByEmail(email: string) {
        return this.userModel.exists({ email });
    }

    async findById(id: string) {
        return this.userModel.findById(id).select('+password')
    }

}
