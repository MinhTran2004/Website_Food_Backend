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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = __importStar(require("bcrypt"));
const mongoose_2 = require("mongoose");
const api_constant_1 = require("../../constants/api.constant");
const error_1 = require("../../model/error");
const user_modal_1 = require("../../model/user.modal");
const schema_dto_1 = require("./dto/schema.dto");
let UserService = class UserService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(data) {
        const { password, ...account } = data;
        if (password.length < 6)
            throw new error_1.BaseException(error_1.Errors.BAD_REQUEST('Minimum password length is 6.'));
        const existed = await this.userModel.findOne({ email: account.email });
        if (existed)
            throw new common_1.ConflictException(error_1.Errors.BAD_REQUEST('Email already exists'));
        const passwordHash = await bcrypt.hash(password, 10);
        const userCreate = await this.userModel.create({
            ...data,
            password: passwordHash
        });
        if (!userCreate)
            throw new common_1.BadRequestException('Create new user failure');
        return api_constant_1.HTTP_RESPONSE.CREATED('en', this.userModel.create({
            ...data,
            password: passwordHash,
            provider: user_modal_1.PROVIDER.NORMAL
        }));
    }
    async findByEmailForAuth(email) {
        return this.userModel.findOne({ email }).select('+password');
    }
    async existsByEmail(email) {
        return this.userModel.exists({ email });
    }
    async findById(id) {
        return this.userModel.findById(id);
    }
    async createUserProvider(body) {
        const user = await this.userModel.create(body);
        if (!user)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('Create new user failure'));
        return api_constant_1.HTTP_RESPONSE.CREATED('en', user);
    }
    async createUserGoogle(body) {
        const user = await this.userModel.create(body);
        if (!user)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('Create new user failure'));
        return api_constant_1.HTTP_RESPONSE.CREATED('en', user);
    }
    async createUserFacebook(body) {
        const user = await this.userModel.create(body);
        if (!user)
            throw new common_1.BadRequestException(error_1.Errors.BAD_REQUEST('Create new user failure'));
        return api_constant_1.HTTP_RESPONSE.CREATED('en', user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_dto_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
