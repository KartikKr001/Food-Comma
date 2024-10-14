const User = require('../schema/userSchema');

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
        }
    }
}

module.exports = UserRepo;
