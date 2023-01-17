import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: [true, 'Review must belong to a user']
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required: [true, 'Review must belong to a product']
    },
   ratings:{
    type:Number,
    min:1,
    max:5
   }
   
}
,
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
)

reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:"userId",
        select:'-password -email -role'
    })
    next()
})


export const reviewModel = mongoose.model('review',reviewSchema)