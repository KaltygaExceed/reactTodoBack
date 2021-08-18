const jwt = require('jsonwebtoken')
const {ServerError, TokenInvalid, TokenExpired, MainError} = require("../utils/error")


const errorHandler = (err, req, res, next) => {
    let error;
    switch (true) {
        case err instanceof MainError:
            error = err;
            break;
        case err instanceof jwt.TokenExpiredError:
            error = new TokenExpired();
            break;
        case err instanceof jwt.JsonWebTokenError:
            error = new TokenInvalid();
            break;
        default:
            error = new ServerError('Internal server error');
            break;
    }
    return res.status(error.statusCode).json(error.dataForSend());
};
module.exports = errorHandler;