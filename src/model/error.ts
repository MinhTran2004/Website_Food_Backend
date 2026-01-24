import { HttpException, HttpStatus } from '@nestjs/common';

interface BaseErrorFormat {
  statusCode: number;
  message: string;
  data: null
}
export class BaseException extends HttpException {
  constructor(response: BaseErrorFormat, cause?: any) {
    super(response, response.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    this.stack = cause;
  }
}

// Define Errors
type keyErrors =
  | 'DEFAULT'
  | 'FORBIDDEN'
  | 'ITEM_NOT_FOUND'
  | 'ITEM_EXISTED'
  | 'CONFIRM_PASSWORD_NOT_MATCH'
  | 'WRONG_PASSWORD'
  | 'BAD_REQUEST'
  | 'FORBIDDEN_VERIFIED'
  | 'UNAUTHORIZED'
  | 'INVALID_OTP'
  | 'CONFLICT'


type IErrors = {
  [key in keyErrors]: (data?: any) => BaseErrorFormat;
};

export const Errors: IErrors = {
  DEFAULT: () => ({
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: "Something went wrong",
    data: null
  }),
  ITEM_NOT_FOUND: (data: string) => ({
    statusCode: HttpStatus.BAD_REQUEST,
    message: `${data} does not exists!`,
    data: null
  }),
  BAD_REQUEST: (data?: string) => ({
    statusCode: HttpStatus.BAD_REQUEST,
    message: data || 'BAD_REQUEST',
    data: null
  }),
  CONFIRM_PASSWORD_NOT_MATCH: () => ({
    statusCode: HttpStatus.BAD_REQUEST,
    message: `Confirm password does not match`,
    data: null
  }),
  ITEM_EXISTED: (data: string) => ({
    statusCode: HttpStatus.BAD_REQUEST,
    message: `${data} has existed!`,
    data: null
  }),
  WRONG_PASSWORD: () => ({
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Wrong password',
    data: null
  }),
  UNAUTHORIZED: () => ({
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Unauthenticated',
    data: null
  }),
  FORBIDDEN: (message?: string) => ({
    statusCode: HttpStatus.FORBIDDEN,
    message: message || 'Forbidden resource',
    data: null
  }),
  FORBIDDEN_VERIFIED: () => ({
    statusCode: HttpStatus.FORBIDDEN,
    message: 'Your account is not verified.',
    data: null
  }),
  INVALID_OTP: (data: string) => ({
    statusCode: HttpStatus.BAD_REQUEST,
    message: data || 'Invalid OTP',
    data: null
  }),
  CONFLICT: (message?: string) => ({
    statusCode: HttpStatus.CONFLICT,
    message: message || 'Conflict',
    data: null
  })
};