const ProductService = require('../services/productService')
const ProductRepo = require('../repositories/productRepo');
const AppError = require('../utils/AppError');

async function addProduct(req,res){
    console.log(req.body);
    try{
        const product_service = new ProductService(new ProductRepo());
        const product = await product_service.registerProduct({
            productName : req.body.productName,
            description : req.body.description,
            price : req.body.price,
            imagePath : req.file.path,
            category : req.body.category,
            inStock : req.body.inStock
        });
        
        
        return res.status(201).json({
            success : true,
            message : "Successfuly created the product",
            error : {},
        })
        
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data : {},
                error : error
            });
        }
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong',
            data : {},
            error : error
        })
    }
}


async function getProduct(req,res) {
    try{
        const product_service = new ProductService(new ProductRepo());
        const product = await product_service.getProductById(req.params.id); 
        return res.status(200).json({
            success : true,
            message : "Success",
            error : {},
            data : product
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data : {},
                error : error
            });
        }
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong',
            data : {},
            error : error
        })
    }
    
}

async function getProducts(req,res) {
    try{
        const product_service = new ProductService(new ProductRepo());
        const products = await product_service.getAllProd(); 
        return res.status(200).json({
            success : true,
            message : "Success",
            error : {},
            data : products
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data : {},
                error : error
            });
        }
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong',
            data : {},
            error : error
        })
    }
    
}

async function deleteProduct(req,res) {
    try{
        const product_service = new ProductService(new ProductRepo());
        const product = await product_service.deleteProductById(req.params.id); 
        return res.status(200).json({
            success : true,
            message : "Success",
            error : {}
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data : {},
                error : error
            });
        }
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong',
            data : {},
            error : error
        })
    }
    
}


module.exports = {
    addProduct,
    getProduct,
    getProducts,
    deleteProduct
}