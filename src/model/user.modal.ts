import { IBaseResponse, IToken } from "./api.model"

export interface IResponseAuth extends IBaseResponse {
    data: IToken & {
        user: IUser
    } | null
}

export interface IUser {
    id: string,
    email: string,
    username: string,
    provider: string,
    avatar: string
}

export enum PROVIDER {
    NORMAL = 'NORMAL',
    GOOGLE = 'google',
    FACEBOOK = 'facebook'
}