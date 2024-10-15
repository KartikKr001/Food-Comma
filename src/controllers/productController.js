const ProductService = require('../services/productService')
const ProductRepo = require('../repositories/productRepo')

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
        console.log(error);
        return res.status(error.statusCode).json({
            success : false,
            message : error.reason,
            data : {},
            error : error
        });
    }
}


module.exports = addProduct;