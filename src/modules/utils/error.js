const statusCode = require("./statusCode");

class MainError extends Error {
    constructor(message, errorType, statusCode) {
        super()
        this.message = message;
        this.errorType = errorType;
        this.statusCode = statusCode
    }

    dataForSend() {
        return {
            status: 'error',
            error: {
                type: this.errorType,
                message: this.message
            }
        }
    }
}

class ValidationError extends MainError {
    constructor(errors) {
        super('Validation Error', 'ValidationError', statusCode.BAD_REQUEST);
        this.errors = errors
    }

    dataForSend() {
        return {
            status: 'error',
            error: {
                type: this.errorType,
                message: this.message,
                errors: this.errors
            }
        };
    }
}

class BadRequest extends MainError {
    constructor(message) {
        super(message, 'BadRequest', statusCode.BAD_REQUEST)
    }
}

class NotFound extends MainError {
    constructor(message) {
        super(message, 'NotFound', statusCode.NOT_FOUND)
    }
}

class Forbidden extends MainError {
    constructor(message) {
        super(message, 'NotFound', statusCode.FORBIDDEN)
    }
}

class ServerError extends MainError {
    constructor(message) {
        super(message, 'NotFound', statusCode.SERVER_ERROR)
    }
}

class UnauthorizedError extends MainError {
    constructor(message) {
        super(message, 'UnauthorizedError', statusCode.UNAUTHORIZED)
    }
}
class TokenExpired extends MainError {
    constructor() {
        super('Token is expired', 'TokenExpired', statusCode.UNAUTHORIZED)
    }
}

class TokenInvalid extends MainError {
    constructor() {
        super('Token is invalid', 'TokenInvalid', statusCode.UNAUTHORIZED)
    }
}

module.exports = {
    MainError,
    BadRequest,
    NotFound,
    Forbidden,
    ServerError,
    TokenExpired,
    TokenInvalid,
    ValidationError,
    UnauthorizedError
}