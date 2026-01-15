export interface IToken {
    accessToken: string
    refreshToken?: string
}

export interface IBaseResponse {
    status: number,
    messenger: string,
}

export interface IPagination {
    page: number;
    perPage: number;
    total: number;
    nextPage: boolean;
    previousPage: boolean;
}

export interface IResponse<T> extends IBaseResponse {
    data: T
}

export interface IResponseListData<T> extends IBaseResponse {
    data: {
        data: T[],
        pagination: IPagination
    }
}