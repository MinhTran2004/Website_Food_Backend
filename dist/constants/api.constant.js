"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_RESPONSE = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
    HttpStatus[HttpStatus["ACCEPTED"] = 202] = "ACCEPTED";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["CONFLICT"] = 409] = "CONFLICT";
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HttpStatus[HttpStatus["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
})(HttpStatus || (HttpStatus = {}));
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
exports.HTTP_RESPONSE = {
    OK: (lang = "vi", data, error) => ({
        status: HttpStatus.OK,
        message: error ? error : HTTP_MESSAGES[HttpStatus.OK][lang],
        data: data ?? null,
    }),
    CREATED: (lang = "vi", data, error) => ({
        status: HttpStatus.CREATED,
        message: error ? error : HTTP_MESSAGES[HttpStatus.CREATED][lang],
        data: data || null,
    }),
    ACCEPTED: (lang = "vi", data, error) => ({
        status: HttpStatus.ACCEPTED,
        message: error ? error : HTTP_MESSAGES[HttpStatus.ACCEPTED][lang],
        data: data ?? null,
    }),
    BAD_REQUEST: (lang = "vi", error) => ({
        status: HttpStatus.BAD_REQUEST,
        message: error ? error : HTTP_MESSAGES[HttpStatus.BAD_REQUEST][lang],
        data: null,
    }),
    UNAUTHORIZED: (lang = "vi", error) => ({
        status: HttpStatus.UNAUTHORIZED,
        message: error ? error : HTTP_MESSAGES[HttpStatus.UNAUTHORIZED][lang],
        data: null,
    }),
    FORBIDDEN: (lang = "vi", error) => ({
        status: HttpStatus.FORBIDDEN,
        message: error ? error : HTTP_MESSAGES[HttpStatus.FORBIDDEN][lang],
        data: null,
    }),
    NOT_FOUND: (lang = "vi", error) => ({
        status: HttpStatus.NOT_FOUND,
        message: error ? error : HTTP_MESSAGES[HttpStatus.NOT_FOUND][lang],
        data: null
    }),
    CONFLICT: (lang = "vi", error) => ({
        status: HttpStatus.CONFLICT,
        message: error ? error : HTTP_MESSAGES[HttpStatus.CONFLICT][lang],
        data: null,
    }),
    INTERNAL_SERVER_ERROR: (lang = "vi", error) => ({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error ? error : HTTP_MESSAGES[HttpStatus.INTERNAL_SERVER_ERROR][lang],
        data: null,
    }),
    BAD_GATEWAY: (lang = "vi", error) => ({
        status: HttpStatus.BAD_GATEWAY,
        message: error ? error : HTTP_MESSAGES[HttpStatus.BAD_GATEWAY][lang],
        data: null,
    }),
};
