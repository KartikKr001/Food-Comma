// Resource -> User
const express = require('express');
const { createUser } = require('../controllers/userController');


// we have to initialize a router object to add routes in a new file 
// routes are used for segregating your routes in different modules
const userRouter = express.Router('/',createUser);  //this is route registration

module.exports = userRouter; //exporting router

