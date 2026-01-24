import { IResponse } from "src/model/api.model";
import { Lang } from "src/model/lang.model";

enum HttpStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
}

const HTTP_MESSAGES = {
    [HttpStatus.OK]: {
        vi: "Thành công",
        en: "Success",
    },

    [HttpStatus.CREATED]: {
        vi: "Tạo dữ liệu thành công",
        en: "Created successfully",
    },

    [HttpStatus.ACCEPTED]: {
        vi: "Yêu cầu đã được chấp nhận",
        en: "Request accepted",
    },

    [HttpStatus.BAD_REQUEST]: {
        vi: "Dữ liệu gửi lên không hợp lệ",
        en: "Bad request",
    },

    [HttpStatus.UNAUTHORIZED]: {
        vi: "Chưa đăng nhập hoặc không có quyền truy cập",
        en: "Unauthorized",
    },

    [HttpStatus.PAYMENT_REQUIRED]: {
        vi: "Yêu cầu thanh toán",
        en: "Payment required",
    },

    [HttpStatus.FORBIDDEN]: {
        vi: "Bạn không có quyền truy cập",
        en: "Forbidden",
    },

    [HttpStatus.NOT_FOUND]: {
        vi: "Không tìm thấy dữ liệu",
        en: "Not found",
    },

    [HttpStatus.CONFLICT]: {
        vi: "Dữ liệu đã tồn tại",
        en: "Resource already exists",
    },

    [HttpStatus.INTERNAL_SERVER_ERROR]: {
        vi: "Lỗi hệ thống",
        en: "Internal server error",
    },

    [HttpStatus.BAD_GATEWAY]: {
        vi: "Lỗi gateway từ server khác",
        en: "Bad gateway",
    },
};

export const HTTP_RESPONSE = {
    OK: (lang: Lang = "vi", data?: any, error?: string): IResponse<null> => ({
        status: HttpStatus.OK,
        message: error ? error : HTTP_MESSAGES[HttpStatus.OK][lang],
        data: data ?? null,
    }),

    CREATED: (lang: Lang = "vi", data?: any, error?: string): IResponse<null> => ({
        status: HttpStatus.CREATED,
        message: error ? error : HTTP_MESSAGES[HttpStatus.CREATED][lang],
        data: data || null,
    }),

    ACCEPTED: (lang: Lang = "vi", data?: any, error?: string): IResponse<null> => ({
        status: HttpStatus.ACCEPTED,
        message: error ? error : HTTP_MESSAGES[HttpStatus.ACCEPTED][lang],
        data: data ?? null,
    }),

    BAD_REQUEST: (lang: Lang = "vi", error?: string) => ({
        status: HttpStatus.BAD_REQUEST,
        message: error ? error : HTTP_MESSAGES[HttpStatus.BAD_REQUEST][lang],
        data: null,
    }),

    UNAUTHORIZED: (lang: Lang = "vi", error?: string): IResponse<null> => ({
        status: HttpStatus.UNAUTHORIZED,
        message: error ? error : HTTP_MESSAGES[HttpStatus.UNAUTHORIZED][lang],
        data: null,
    }),

    FORBIDDEN: (lang: Lang = "vi", error?: string): IResponse<null> => ({
        status: HttpStatus.FORBIDDEN,
        message: error ? error : HTTP_MESSAGES[HttpStatus.FORBIDDEN][lang],
        data: null,
    }),

    NOT_FOUND: (lang: Lang = "vi", error?: string): IResponse<null> => ({
        status: HttpStatus.NOT_FOUND,
        message: error ? error : HTTP_MESSAGES[HttpStatus.NOT_FOUND][lang],
        data: null
    }),

    CONFLICT: (lang: Lang = "vi", error?: string): IResponse<null> => ({
        status: HttpStatus.CONFLICT,
        message: error ? error : HTTP_MESSAGES[HttpStatus.CONFLICT][lang],
        data: null,
    }),

    INTERNAL_SERVER_ERROR: (lang: Lang = "vi", error?: string): IResponse<null> => ({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error ? error : HTTP_MESSAGES[HttpStatus.INTERNAL_SERVER_ERROR][lang],
        data: null,
    }),

    BAD_GATEWAY: (lang: Lang = "vi", error?: string): IResponse<null> => ({
        status: HttpStatus.BAD_GATEWAY,
        message: error ? error : HTTP_MESSAGES[HttpStatus.BAD_GATEWAY][lang],
        data: null,
    }),
};



