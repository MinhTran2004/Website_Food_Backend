"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const api_constant_1 = require("../../constants/api.constant");
const axios_1 = __importDefault(require("axios"));
const google_auth_library_1 = require("google-auth-library");
const error_1 = require("../../model/error");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    userService;
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(data) {
        return api_constant_1.HTTP_RESPONSE.CREATED('en', this.userService.create(data));
    }
    async login(data) {
        const { email, password } = data;
        const user = await this.userService.findByEmailForAuth(email);
        if (!user) {
            throw new common_1.UnauthorizedException(error_1.Errors.UNAUTHORIZED('Email or password is incorrect'));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException(error_1.Errors.UNAUTHORIZED('Email or password is incorrect'));
        }
        const payload = {
            id: user._id,
            email: user.email,
            username: user.username,
            avatar: user.avatar,
            provider: user.provider,
        };
        const accessToken = this.jwtService.sign(payload);
        return api_constant_1.HTTP_RESPONSE.OK('en', {
            accessToken: accessToken,
            user: user,
        });
    }
    async loginGoogle(body) {
        const { idToken, provider } = body;
        if (!idToken)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('idToken is empty'));
        const tokenParts = idToken.split('.');
        if (tokenParts.length !== 3) {
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('Invalid token format'));
        }
        const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.name || !payload.email || !payload.picture) {
            throw new common_1.BadRequestException(error_1.Errors.ITEM_NOT_FOUND('Name, Email, or Picture null data'));
        }
        const { name, email, picture } = payload;
        const emailExisted = await this.userService.existsByEmail(email);
        if (!emailExisted) {
            const res = await this.userService.createUserGoogle({
                username: name,
                email: email,
                avatar: picture,
                provider: provider,
            });
            if (res.data) {
                const user = {
                    id: res.data._id,
                    email: res.data.email,
                    username: res.data.username,
                    avatar: res.data.avatar,
                    provider: res.data.provider,
                };
                return api_constant_1.HTTP_RESPONSE.OK('en', {
                    accessToken: await this.jwtService.signAsync(user),
                    user: user,
                });
            }
            return null;
        }
        const data = await this.userService.findById(emailExisted._id.toString());
        const user = {
            id: data?._id,
            username: data?.username,
            avatar: data?.avatar,
            email: data?.email,
            provider: data?.provider,
        };
        return api_constant_1.HTTP_RESPONSE.OK('en', {
            accessToken: await this.jwtService.signAsync(user),
            user: user,
        });
    }
    async loginFacebook(body) {
        const { accessToken, provider } = body;
        if (!accessToken)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('idToken is empty'));
        const fbRes = await axios_1.default.get('https://graph.facebook.com/me', {
            params: {
                fields: 'name,email,picture',
                access_token: accessToken,
            },
        });
        if (!fbRes.data.name || !fbRes.data.email || !fbRes.data.picture.data.url)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('Name, Email, Picture is empty!'));
        const { name, email, picture } = fbRes.data;
        const emailExisted = await this.userService.existsByEmail(email);
        if (!emailExisted) {
            const res = await this.userService.createUserFacebook({
                username: name,
                email: email,
                avatar: picture.data.url,
                provider: provider,
            });
            if (res.data) {
                const user = {
                    id: res.data._id,
                    email: res.data.email,
                    username: res.data.username,
                    avatar: res.data.avatar,
                    provider: res.data.provider,
                };
                return api_constant_1.HTTP_RESPONSE.OK('en', {
                    accessToken: await this.jwtService.signAsync(user),
                    user: user,
                });
            }
            return null;
        }
        const data = await this.userService.findById(emailExisted._id.toString());
        if (!data)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('Find user error!'));
        const user = {
            id: data?._id,
            username: data?.username,
            avatar: data?.avatar,
            email: data?.email,
            provider: data?.provider,
        };
        return api_constant_1.HTTP_RESPONSE.OK('en', {
            accessToken: await this.jwtService.signAsync(user),
            user: user,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
