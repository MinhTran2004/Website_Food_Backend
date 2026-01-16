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
    OK: (lang: Lang = "vi", data?: any) => ({
        status: HttpStatus.OK,
        message: HTTP_MESSAGES[HttpStatus.OK][lang],
        data: data ?? null,
    }),

    CREATED: (lang: Lang = "vi", data?: any) => ({
        status: HttpStatus.CREATED,
        message: HTTP_MESSAGES[HttpStatus.CREATED][lang],
        data: data ?? null,
    }),

    ACCEPTED: (lang: Lang = "vi", data?: any) => ({
        status: HttpStatus.ACCEPTED,
        message: HTTP_MESSAGES[HttpStatus.ACCEPTED][lang],
        data: data ?? null,
    }),

    BAD_REQUEST: (lang: Lang = "vi", error?: any) => ({
        status: HttpStatus.BAD_REQUEST,
        message: HTTP_MESSAGES[HttpStatus.BAD_REQUEST][lang],
        error: error ?? null,
    }),

    UNAUTHORIZED: (lang: Lang = "vi") => ({
        status: HttpStatus.UNAUTHORIZED,
        message: HTTP_MESSAGES[HttpStatus.UNAUTHORIZED][lang],
    }),

    FORBIDDEN: (lang: Lang = "vi") => ({
        status: HttpStatus.FORBIDDEN,
        message: HTTP_MESSAGES[HttpStatus.FORBIDDEN][lang],
    }),

    NOT_FOUND: (lang: Lang = "vi"): IResponse<null> => ({
        status: HttpStatus.NOT_FOUND,
        message: HTTP_MESSAGES[HttpStatus.NOT_FOUND][lang],
        data: null
    }),

    CONFLICT: (lang: Lang = "vi"): IResponse<null> => ({
        status: HttpStatus.CONFLICT,
        message: HTTP_MESSAGES[HttpStatus.CONFLICT][lang],
        data: null,
    }),

    INTERNAL_SERVER_ERROR: (lang: Lang = "vi") => ({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: HTTP_MESSAGES[HttpStatus.INTERNAL_SERVER_ERROR][lang],
    }),

    BAD_GATEWAY: (lang: Lang = "vi") => ({
        status: HttpStatus.BAD_GATEWAY,
        message: HTTP_MESSAGES[HttpStatus.BAD_GATEWAY][lang],
    }),
};



