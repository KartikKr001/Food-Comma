const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    items:[  // array of object-items
        {
            product:{
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Product',
                required : true
            },
            quantity:{
                type : Number,
                required : true,
                default : 1,
            }
        }
    ],
    totalPrice:{
        type : Number,
        required : true,
    },
    staus:{
        type : String,
        default : 'ordered',
        enum : ['shipped', 'delivered','cancelled','out for delivery','processing','ordered'],
    },
    address:{
        type : String,
        required : true,
        minLength : [10,"Address must be of atleast 10 characters"]
    },
    paymentMethod:{
        type : String,
        required : true,
        enum : ['offline','online'],
        default : 'offline'
    }
},{
    timestamps : true
})

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;