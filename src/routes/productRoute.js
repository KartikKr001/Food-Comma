const express = require('express');
const addProduct = require('../controllers/productController');
const uploader = require('../Middlewares/MulterMiddleware');


// we have to initialize a router object to add routes in a new file 
// routes are used for segregating your routes in different modules
const productRouter = express.Router();

productRouter.post('/', uploader.single('productImage') , addProduct);  // Add a route to the router
// get/:id
// productRouter.get('/:id')
// delete/:id
module.exports = productRouter; // Exporting router