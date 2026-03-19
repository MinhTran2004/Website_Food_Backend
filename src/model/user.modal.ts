import { IBaseResponse, IToken } from './api.model';

export interface IResponseAuth extends IBaseResponse {
  data:
    | (IToken & {
        user: IUser;
      })
    | null;
}

export interface IUser {
  _id: string;
  email: string;
  username: string;
  provider: string;
  avatar: string;
}

export enum PROVIDER {
  NORMAL = 'normal',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export interface IUserJWT {
    idUser: string;
    email: string;
  }