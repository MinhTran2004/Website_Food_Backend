import { IBaseResponse, IToken } from "./api.model"

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

