const AppError = require('./AppError');

class internalServerError extends AppError{
    constructor(resource) {
        super(`It's not you, it's our server where something went wrong! `,500);
    }
}

module.exports = internalServerError;