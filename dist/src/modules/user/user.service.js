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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../../../prisma/prisma.service");
const api_constant_1 = require("../../constants/api.constant");
const error_1 = require("../../model/error");
let UserService = class UserService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async create(body) {
        const { password, ...account } = body;
        if (password.length < 6)
            throw new error_1.BaseException(error_1.Errors.BAD_REQUEST('Minimum password length is 6.'));
        const existed = await this.prisma.user.findUnique({
            where: { email: account.email },
        });
        if (existed)
            throw new common_1.ConflictException(error_1.Errors.BAD_REQUEST('Email already exists'));
        const passwordHash = (await bcrypt.hash(password, 10));
        const userCreate = await this.prisma.user.create({
            data: {
                ...body,
                password: passwordHash,
            },
        });
        if (!userCreate)
            throw new common_1.BadRequestException('Create new user failure');
        return api_constant_1.HTTP_RESPONSE.CREATED('en', userCreate);
    }
    async createUserProvider(body) {
        const user = await this.prisma.user.create({
            data: { password: '', ...body },
        });
        if (!user)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('Create new user failure'));
        return api_constant_1.HTTP_RESPONSE.CREATED('en', user);
    }
    async get(user) {
        const { idUser } = user;
        if (!idUser)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('IdUser is required'));
        const userExists = await this.prisma.user.findUnique({
            where: { id: idUser },
        });
        return api_constant_1.HTTP_RESPONSE.OK('en', userExists);
    }
    async findByEmailForAuth(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async existsByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async findById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async login(data) {
        const { email, password } = data;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException(error_1.Errors.UNAUTHORIZED('Email or password is incorrect'));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException(error_1.Errors.UNAUTHORIZED('Email or password is incorrect'));
        }
        const payload = {
            sub: user.id,
            email: user.email,
        };
        const accessToken = this.jwtService.sign(payload);
        return api_constant_1.HTTP_RESPONSE.OK('en', {
            accessToken: accessToken,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        });
    }
    async getListUserByUserName(userName, user) {
        if (!userName)
            throw new common_1.ConflictException(error_1.Errors.CONFLICT('userName is required'));
        const users = await this.prisma.user.findMany({
            where: {
                username: {
                    startsWith: userName,
                    mode: 'insensitive',
                },
                id: {
                    not: user.idUser,
                },
            },
        });
        return api_constant_1.HTTP_RESPONSE.OK('en', {
            items: users,
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], UserService);
