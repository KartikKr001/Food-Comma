const express = require('express');
const {addProduct, getProduct, deleteProduct} = require('../controllers/productController');
const uploader = require('../Middlewares/MulterMiddleware');


// we have to initialize a router object to add routes in a new file 
// routes are used for segregating your routes in different modules
const productRouter = express.Router();

productRouter.post('/', uploader.single('productImage') , addProduct);  // Add a route to the router
productRouter.get('/:id', getProduct);  // Add a route to the router
productRouter.delete('/:id', deleteProduct);  // Add a route to the router


module.exports = productRouter; // Exporting router
