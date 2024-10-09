const express = require('express')
const { login } = require('../controllers/authController')


// we have to initialize a router object to add routes in a new file 
// routes are used for segregating your routes in different modules
const authRouter = express.Router();

authRouter.post('/login',login);  // Add a route to the router

module.exports = authRouter   // Exporting router
    