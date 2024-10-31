const User = require('../schema/userSchema');
const internalServerError = require('../utils/internalServerError');

class UserRepo {
    async findUser(parameters) {
        try {
            const response = await User.findOne({ ...parameters });
            return response;
        } catch (error) {
            console.log("find user error");
        }
    }
    
    async create_user(userDetails) {
        try {
            const response = await User.create(userDetails);
            return response;
        } catch (error) {
            console.log("create user error", error);
            throw new internalServerError();
        }
    }
}

module.exports = UserRepo;
