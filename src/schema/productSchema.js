const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    produceName: { 
        type: String, 
        required: [true,"Product name is required"],
        minlength : [5,"Product name must be atleast 5 characters"],
        trim:true
    },
    description: { 
        type: String, 
        minlength : [5,"Product name must be atleast 5 characters"],
    },
    produceImage: { 
        type: String 
    },
    price: { 
        type: Number, 
        required: [true,"Product price is required"],
    },
    category: { 
        type: String, 
        enum: ['veg', 'non-veg', 'drinks','sides'], 
        required: true,
        default:'veg'
    },
    toppings:{ 
        type: String 
    },
    inStock: { 
        type: Boolean, 
        required : [true,"In stock status is required"],
        default: true 
    },
    calories: { 
        type: Number 
    }
},{timestamps : true});

const Product = mongoose.model('Product',productSchema);
module.exports = Product;