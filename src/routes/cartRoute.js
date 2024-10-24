const express = require('express');
const { getCartByUser, modifyProductToCart } = require('../controllers/cartController');
const {isLoggedIn, isAdmin} = require('../validation/authValidator')


const cartRoute = express.Router();

cartRoute.get('/', isLoggedIn ,getCartByUser);
cartRoute.post('/:operation/:productId', isLoggedIn , modifyProductToCart);

module.exports = cartRoute;