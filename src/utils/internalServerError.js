const AppError = require('./AppError');

class internalServerError extends AppError{
    constructor(resource) {
        super(resource,500);
    }
}

module.exports = internalServerError;