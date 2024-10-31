const Product = require('../schema/productSchema');
const BadRequestErrors = require('../utils/badRequestError');
const internalServerError = require('../utils/internalServerError');

class ProductRepo{
    async create_product(productDetails){
        try{
            const response = await Product.create(productDetails);
            return response;
        }    
        catch(error){
            if(error.name == 'Validation Error'){
                const errorMessageList = Object.keys(error.errors).map((property)=>{
                    return error.errors[property].message;
                })
                throw new BadRequestErrors(errorMessageList); 
            }
            console.log('Product Find error',error);
            throw new internalServerError(errorMessageList);
        }
    }

    async getProductByDetails(productDetails){
        try {
            const pro = await Product.findOne(productDetails);
            return pro;
        } catch (error) {
            console.log(error);
            throw new internalServerError();
        }
    }

    async getProd_id(productId){
        try {
            const pro = await Product.findById(productId);
            return pro;
        } catch (error) {
            console.log(error);
            throw new internalServerError();
        }
    }

    async getAllProducts(){
        try{
            const products = await Product.find({});
            return products;
        }
        catch(error){
            console.log(error);
            throw new internalServerError();
        }
    }


    async deleteProd_id(productId){
        try {
            const pro = await Product.findByIdAndDelete(productId);
            return pro;
        } catch (error) {
            console.log(error);
            throw new internalServerError();
        }
    }
}

module.exports = ProductRepo;