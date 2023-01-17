import { reviewModel } from "../Models/reviewModel.js";
import { CreateError } from "../Utils/error.js";
import { productModel } from "../Models/productModel.js";

export const createReview =async(req,res,next)=>{
    const {userId,productId,ratings} =req.body
    try {
       const review = reviewModel({
        userId,
        productId,
        ratings:ratings
       })
       
       const result = await review.save()
       await productModel.findByIdAndUpdate(productId,{$push:{reviews:result._id}},{new:true})
       return res.status(200).json({
        status:'success',
        review:result
       })
    } catch (error) {
       next(error)
        
    }
}