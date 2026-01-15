import { IBaseResponse, IToken } from "./commom"

export interface IResponseAuth extends IBaseResponse {
    data: IToken & {
        user: IUser
    }
}

export interface IUser {
    id: string,
    email: string,
    username: string,
}

