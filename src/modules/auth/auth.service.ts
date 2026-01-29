/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HTTP_RESPONSE } from 'src/constants/api.constant';

import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
import { IResponse } from 'src/model/api.model';
import { Errors } from 'src/model/error';
import { IResponseAuth, IUser } from 'src/model/user.modal';
import { LoginFacebookRequestDto, LoginGoogleRequestDto, LoginRequestDto, RegisterRequestDto } from '../user/dto/request.dto';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async register(data: RegisterRequestDto): Promise<IResponse<IUser | null>> {
        return HTTP_RESPONSE.CREATED('en', this.userService.create(data))
    }

    async login(body: LoginRequestDto): Promise<IResponseAuth | null> {
        const { email, password } = body;

        const user = await this.userService.findByEmailForAuth(email)

        if (!user) return HTTP_RESPONSE.NOT_FOUND('en', 'User not found');

        const match = await bcrypt.compare(password, user.password)

        if (!match) HTTP_RESPONSE.BAD_REQUEST('en', 'Incorrect password')

        const payload = { id: user._id, email: user.email };

        return HTTP_RESPONSE.OK('en', {
            accessToken: await this.jwtService.signAsync(payload),
            user: {
                id: user._id.toString(),
                email: user.email,
                username: user.username
            }
        })
    }

    async loginGoogle(body: LoginGoogleRequestDto): Promise<IResponseAuth | null> {
        const { accessToken, idToken, provider } = body;

        if (!idToken) throw new BadRequestException(Errors.BAD_REQUEST('idToken is empty'))

        const tokenParts = idToken.split('.');
        if (tokenParts.length !== 3) {
            throw new BadRequestException(Errors.BAD_REQUEST('Invalid token format'));
        }

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload();

        if (!payload || !payload.name || !payload.email || !payload.picture) {
            throw new BadRequestException(Errors.ITEM_NOT_FOUND('Name, Email, or Picture null data'));
        }

        const { name, email, picture } = payload;

        const emailExisted = await this.userService.existsByEmail(email);

        // if not account
        if (!emailExisted) {
            const res = await this.userService.createUserGoogle({ username: name, email: email, avatar: picture, provider: provider });
            if (res.data) {
                const user = {
                    id: res.data.id,
                    email: res.data.email,
                    username: res.data.username,
                    avatar: res.data.avatar,
                    provider: res.data.provider,
                };

                return HTTP_RESPONSE.OK('en', {
                    accessToken: await this.jwtService.signAsync(user),
                    user: user
                })
            }
            return null;
        }

        // if have a account
        const data = await this.userService.findById(emailExisted._id.toString())

        const user = {
            id: data?.id,
            username: data?.username,
            avatar: data?.avatar,
            email: data?.email,
            provider: data?.provider,
        }

        return HTTP_RESPONSE.OK('en', {
            accessToken: await this.jwtService.signAsync(user),
            user: user
        })
    }

    async loginFacebook(body: LoginFacebookRequestDto): Promise<IResponseAuth | null> {
        const { accessToken, provider } = body;

        if (!accessToken) throw new BadRequestException(Errors.BAD_REQUEST('idToken is empty'))

        const fbRes = await axios.get("https://graph.facebook.com/me", {
            params: {
                fields: "name,email,picture",
                access_token: accessToken,
            },
        });

        if (!fbRes.data.name || !fbRes.data.email || !fbRes.data.picture.data.url) throw new BadRequestException(Errors.BAD_REQUEST('Name, Email, Picture is empty!'));

        const { name, email, picture } = fbRes.data;

        const emailExisted = await this.userService.existsByEmail(email);

        // // if not account
        if (!emailExisted) {
            const res = await this.userService.createUserFacebook({ username: name, email: email, avatar: picture.data.url, provider: provider });

            if (res.data) {
                const user = {
                    id: res.data.id,
                    email: res.data.email,
                    username: res.data.username,
                    avatar: res.data.avatar,
                    provider: res.data.provider,
                };

                return HTTP_RESPONSE.OK('en', {
                    accessToken: await this.jwtService.signAsync(user),
                    user: user
                })
            }
            return null;
        }

        // // if have a account
        const data = await this.userService.findById(emailExisted._id.toString())
        if (!data) throw new BadRequestException(Errors.BAD_REQUEST('Find user error!'))

        const user = {
            id: data?.id,
            username: data?.username,
            avatar: data?.avatar,
            email: data?.email,
            provider: data?.provider,
        }

        return HTTP_RESPONSE.OK('en', {
            accessToken: await this.jwtService.signAsync(user),
            user: user
        })
    }
}
