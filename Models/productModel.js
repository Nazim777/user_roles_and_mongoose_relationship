import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    user:{
       // parent referencing
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'please provide user id'],
        ref:'user'
    },
    title:{
        type:String,
        required:[true,'please provide product title']
    },
    desc:{
        type:String,
        required:[true,'please provide prodct description']
    },
    price:{
        type:Number,
        required:[true,'please provide product price']
    },
    quantity:{
        type:Number,
        required:[true,'please provide product quantity']
    },
    category:{
        type:String,
        required:[true,'please provide product category']
    },
    image:{
        type:Object
    },

    // child referencing
    reviews:[{type:mongoose.Schema.Types.ObjectId,ref:'review'}]
},
{
    timestamps:true
}
)

export const productModel = mongoose.model('product',productSchema)