import { productModel } from "../Models/productModel.js";
import { CreateError } from "../Utils/error.js";
import cloudinary from "../Utils/Cloudinary.js";
export const createProduct = async(req,res,next)=>{
    const {title,desc,image,price,quantity,category} = req.body
    const {id} = req.params
    // console.log(req.body)
    // console.log('id',id)

    // console.log(req.user)
    try {
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image,{upload_preset:'product_image'});
            if(!uploadResponse) return next(CreateError(400,'product image does not upload!'))
            const newProduct = await productModel({
                user:id,
                image:uploadResponse,
                title,
                desc,
                category,
                price,
                quantity
            })
            const result = await newProduct.save()
          return  res.status(201).json({message:'product create successfully!',product:result})
        }
        const newProduct = await productModel({
            user:id,
            title,
            desc,
            category,
            price,
            quantity
        })
        const result = await newProduct.save()
        return  res.status(201).json({message:'product create successfully!',product: result})
        
    } catch (error) {
        next(error)
        
    }
}

export const getSingleProduct = async(req,res,next)=>{
    const {productId} = req.params
    try {
        const product = await productModel.findById(productId).populate('reviews')
        if(!product) return next(CreateError(400,'product does not found!'))
        res.status(200).json({product:product})
    } catch (error) {
        next(error)
        
    }
}


export const userAllProduct = async(req,res,next)=>{
    const {id} = req.params
    try {
        const product = await productModel.find({user:id})
        if(!product) return next(CreateError(400,"no product found!"))
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}

 export const updateProduct = async(req,res,next)=>{
    const {productId} = req.params
    
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(productId,req.body,{new:true})
        res.status(200).json({message:'product update successfully!',product:updatedProduct})

    } catch (error) {
        next(error)
        
    }
}
export const deleteProduct = async(req,res,next) =>{
    const {productId} = req.params
    try {
    const product = await productModel.findByIdAndDelete(productId)
    res.status(200).json({message:'product delete successfully!'})
    } catch (error) {
        next(error)
        
    }

}


export const getAllProduct = async(req,res,next) =>{
    // console.log(req.user)
    try {
        const products = await productModel.find().populate({
            path:'user',
           select:'-password -email -role'
        })
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}