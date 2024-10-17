const AppError = require('./AppError');

class NotFound extends AppError{
    constructor(resource) {
        super(`Not able to find ${resource}`,404);
    }
}

module.exports = NotFound;