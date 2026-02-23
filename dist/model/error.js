"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = exports.BaseException = void 0;
const common_1 = require("@nestjs/common");
class BaseException extends common_1.HttpException {
    constructor(response, cause) {
        super(response, response.statusCode || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        this.stack = cause;
    }
}
exports.BaseException = BaseException;
exports.Errors = {
    DEFAULT: () => ({
        statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Something went wrong",
        data: null
    }),
    ITEM_NOT_FOUND: (data) => ({
        statusCode: common_1.HttpStatus.BAD_REQUEST,
        message: `${data} does not exists!`,
        data: null
    }),
    BAD_REQUEST: (data) => ({
        statusCode: common_1.HttpStatus.BAD_REQUEST,
        message: data || 'BAD_REQUEST',
        data: null
    }),
    CONFIRM_PASSWORD_NOT_MATCH: () => ({
        statusCode: common_1.HttpStatus.BAD_REQUEST,
        message: `Confirm password does not match`,
        data: null
    }),
    ITEM_EXISTED: (data) => ({
        statusCode: common_1.HttpStatus.BAD_REQUEST,
        message: `${data} has existed!`,
        data: null
    }),
    WRONG_PASSWORD: () => ({
        statusCode: common_1.HttpStatus.BAD_REQUEST,
        message: 'Wrong password',
        data: null
    }),
    UNAUTHORIZED: () => ({
        statusCode: common_1.HttpStatus.UNAUTHORIZED,
        message: 'Unauthenticated',
        data: null
    }),
    FORBIDDEN: (message) => ({
        statusCode: common_1.HttpStatus.FORBIDDEN,
        message: message || 'Forbidden resource',
        data: null
    }),
    FORBIDDEN_VERIFIED: () => ({
        statusCode: common_1.HttpStatus.FORBIDDEN,
        message: 'Your account is not verified.',
        data: null
    }),
    INVALID_OTP: (data) => ({
        statusCode: common_1.HttpStatus.BAD_REQUEST,
        message: data || 'Invalid OTP',
        data: null
    }),
    CONFLICT: (message) => ({
        statusCode: common_1.HttpStatus.CONFLICT,
        message: message || 'Conflict',
        data: null
    })
};
