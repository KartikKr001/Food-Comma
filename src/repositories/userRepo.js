const User = require('../schema/userSchema');
const internalServerError = require('../utils/internalServerError');
const BadRequestErrors = require('../utils/badRequestError');


class UserRepo {
    async findUser(parameters) {
        try {
            const response = await User.findOne({ ...parameters });
            return response;
        } catch (error) {
            return new internalServerError(error);
        }
    }
    
    async create_user(userDetails) {
        try {
            const response = await User.create(userDetails);
            return response;
        } catch (error) {
            if(error.name == 'ValidationError'){
            const errorMessageList = Object.keys(error.errors).map((property)=>{
                return error.errors[property].message;
                })
                throw new BadRequestErrors(errorMessageList); 
            }
            console.log(error.name)
            throw new internalServerError();
        }
    }
}

module.exports = UserRepo;
