const express = require('express');
const {isLoggedIn, isAdmin} = require('../validation/authValidator');
const { createNewOrder } = require('../controllers/orderController');


const orderRoute = express.Router();

orderRoute.post('/', isLoggedIn ,createNewOrder);

module.exports = orderRoute;

