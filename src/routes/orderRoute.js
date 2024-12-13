const express = require('express');
const {isLoggedIn, isAdmin} = require('../validation/authValidator');
const { createNewOrder, getAllOrdersByUser, OrderDetails, cancelOrder, changeOrderStatus } = require('../controllers/orderController');
const { checkout , paymentVerification} = require('../controllers/paymentController');


const orderRoute = express.Router();

orderRoute.post('/', isLoggedIn ,createNewOrder);
orderRoute.get('/', isLoggedIn ,getAllOrdersByUser);
orderRoute.get('/:orderId', isLoggedIn ,OrderDetails);
orderRoute.put('/:orderId/cancel', isLoggedIn ,cancelOrder);
orderRoute.put('/:orderId/status', isLoggedIn, isAdmin ,changeOrderStatus);
orderRoute.post('/checkout',checkout);
orderRoute.post('/paymentverification',paymentVerification);

module.exports = orderRoute;

