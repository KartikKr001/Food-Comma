const cloudinary = require('../config/cloudConfig')
const fs = require('fs/promises')

class ProductService{
    constructor(_prod_repo){
        this.productRepo = _prod_repo
    }

    async registerProduct(productDetails){
        // we check for image in productDetails
        // if there, upload and then give url

        const imagePath = req.imagePath;
        if(imagePath){
            // upload to cloudinary
            try{   
                const clodudinaryResponse = await cloudinary.uploader.upload(imagePath);
                var productImage = clodudinaryResponse.secure_url;
                await fs.unlink({imagePath});
            }
            catch(error){
                console.log(error);
                throw {reason : 'Not able to create product',statusCode : 500}
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
}


module.exports = ProductService;