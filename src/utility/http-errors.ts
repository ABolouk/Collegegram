export class HttpError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}

export class NotFoundError extends HttpError {
    constructor() {
        super(404, "موردی یافت نشد.");
    }
}

export class ForbiddenError extends HttpError {
    constructor() {
        super(403, "شما از سیستم خارج شده اید. لطفا دوباره وارد شوید.");
    }
}
export class UnauthorizedError extends HttpError {
    constructor() {
        super(401, "شما اجازه دسترسی به این صفحه را ندارید.");
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(400, "درخواست نامعتبر.");
    }
}

export class serviceUnavailableError extends HttpError {
    constructor() {
        super(503, "سرور در دسترس نیست.");
    }

}


