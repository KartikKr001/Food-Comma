const AppError = require('./AppError');

class BadRequestErrors extends AppError{
    constructor(invalidParams) {
        // invalidParams = []
        let message = "";
        invalidParams.forEach((p)=>{message +=  `${p}\n`});
        super(`The request has following invalid parameters \n ${message}`, 400);

    }
}

module.exports = BadRequestErrors;