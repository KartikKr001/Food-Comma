const cloudinary = require('../config/cloudConfig')
const fs = require('fs/promises');
const internalServerError = require('../utils/internalServerError');
const ProductRepo = require('../repositories/productRepo');
const NotFound = require('../utils/notFoundError');

class ProductService{
    constructor(_prod_repo){
        this.productRepo = _prod_repo
    }

    async registerProduct(productDetails){
        // we check for image in productDetails
        // if there, upload and then give url
        
        const imagePath = productDetails.imagePath;
        console.log("img path: ",imagePath);
        if(imagePath){
            // upload to cloudinary
            try{   
                const clodudinaryResponse = await cloudinary.uploader.upload(imagePath);
                console.log("resp: ",clodudinaryResponse)
                var productImage = clodudinaryResponse.secure_url;
                await fs.unlink(imagePath);
            }
            catch(error){
                console.log(error);
                throw new internalServerError();
            }
        }

         
        const product = await this.productRepo.findProduct({
            ...productDetails,
            productImage : productImage
        });

        if(product){
            throw{
                message: "given product already exists",
                statusCode : 400
            }
        }
        
        const new_product = await this.productRepo.create_product({
            ...productDetails,
            productImage : productImage
        })
        
        if(!new_product){
            throw{
                message: "Something went wrong cann't register product",
                statusCode : 500
            }
        }

        return new_product;
    }


    async getProductById(productId){
        const response = await ProductRepo.getProd_id(productId);
        if(!response){
            throw NotFound('Product');
        }
        return response;
    }

    async deleteProductById(productId){
        const response = await ProductRepo.deleteProd_id(productId);
        if(!response){
            throw NotFound('Product');
        }
        return response;
    }
}


module.exports = ProductService;