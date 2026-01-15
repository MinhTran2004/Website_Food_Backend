import { HttpException, HttpStatus } from '@nestjs/common';

interface BaseErrorFormat {
  errCode: string;
  statusCode: number;
  message: string;
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


type IErrors = {
  [key in keyErrors]: (data?: any) => BaseErrorFormat;
};

export const Errors: IErrors = {
  DEFAULT: () => ({
    errCode: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: "Something went wrong",
  }),
  ITEM_NOT_FOUND: (data: string) => ({
    errCode: HttpStatus.BAD_REQUEST.toString(),
    statusCode: HttpStatus.BAD_REQUEST,
    message: `${data} does not exists!`,
  }),
  BAD_REQUEST: (data?: string) => ({
    errCode: HttpStatus.BAD_REQUEST.toString(),
    statusCode: HttpStatus.BAD_REQUEST,
    message: data || 'BAD_REQUEST',
  }),
  CONFIRM_PASSWORD_NOT_MATCH: () => ({
    errCode: HttpStatus.BAD_REQUEST.toString(),
    statusCode: HttpStatus.BAD_REQUEST,
    message: `Confirm password does not match`,
  }),
  ITEM_EXISTED: (data: string) => ({
    errCode: HttpStatus.BAD_REQUEST.toString(),
    statusCode: HttpStatus.BAD_REQUEST,
    message: `${data} has existed!`,
  }),
  WRONG_PASSWORD: () => ({
    errCode: HttpStatus.BAD_REQUEST.toString(),
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Wrong password',
  }),
  UNAUTHORIZED: () => ({
    errCode: HttpStatus.UNAUTHORIZED.toString(),
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Unauthenticated',
  }),
  FORBIDDEN: (message?: string) => ({
    errCode: HttpStatus.FORBIDDEN.toString(),
    statusCode: HttpStatus.FORBIDDEN,
    message: message || 'Forbidden resource',
  }),
  FORBIDDEN_VERIFIED: () => ({
    errCode: HttpStatus.FORBIDDEN.toString(),
    statusCode: HttpStatus.FORBIDDEN,
    message: 'Your account is not verified.',
  }),
  INVALID_OTP: (data: string) => ({
    errCode: HttpStatus.BAD_REQUEST.toString(),
    statusCode: HttpStatus.BAD_REQUEST,
    message: data || 'Invalid OTP',
  }),
};