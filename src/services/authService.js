const UserRepo = require('../repositories/userRepo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret_key, JWT_expiry } = require('../config/ServerConfig');

// Create an instance of the UserRepo class
const userRepoInstance = new UserRepo();

async function loginUser(authDetails) {
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    // check if user exists
    const user = await userRepoInstance.findUser({ email });

    // user not exist
    if (!user) {
        throw {
            message: "no user exists with given email",
            statusCode: "404"
        };
    }

    // user found, compare plain password with hashed password
    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
    if (!isPasswordValid) {
        throw {
            message: "Invalid Password, please try again!",
            statusCode: "401"
        };
    }
    else{
        console.log("hello world")
    }
    const userRole = user.role || "USER"
    // password is validated, create and return token
    const token = jwt.sign({ email: user.email, id: user._id ,role :userRole}, secret_key, {
        expiresIn: JWT_expiry
    });

    return token;
}

module.exports = {
    loginUser
};
