const Product = require('../schema/productSchema')

class ProductRepo{
    async findProduct(parameters){
        console.log("p: ",parameters);
        try{
            const response = await Product.findOne({...parameters});
            return response;
        }
        catch(error){
            console.log('Product Find error',error);
        }
    }


    async create_product(productDetails){
        try{
            const response = await Product.create(productDetails);
            return response;
        }    
        catch(error){
            console.log("Error while creating product " , error);
        }
    }
}

module.exports = ProductRepo;