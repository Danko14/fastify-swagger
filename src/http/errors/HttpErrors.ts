class HttpError extends Error {
    statusCode: number
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}

export class BadRequest extends HttpError {
    constructor(message: string = "Bad request") {
        super(message, 400)
    }
}

export class Unauthorized extends HttpError {
    constructor(message: string = "Unauthorized") {
        super(message, 401)
    }
}

export class Forbidden extends HttpError {
    constructor(message: string = "Forbidden") {
        super(message, 403)
    }
}

export class NotFound extends HttpError {
    constructor(message: string = "Not found") {
        super(message, 404)
    }
}

export class InternalServerError extends HttpError {
    constructor(message: string = "Internal server error") {
        super(message, 500)
    }
}
