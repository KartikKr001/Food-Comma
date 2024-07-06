const express = require('express');
const { getCartById } = require('../controllers/cartController');

const cartRoute = express.Router();

cartRoute.get('/:id',getCartById);

module.exports = cartRoute;