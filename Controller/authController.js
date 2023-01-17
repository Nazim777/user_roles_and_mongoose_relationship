import { userModel } from "../Models/userModel.js";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import {CreateError} from '../Utils/error.js'

export const registerUser = async(req,res,next)=>{
    const {name,email,password} = req.body 
    try {
        const user = await userModel.findOne({email:email})
        if(user) return next(CreateError(400,'user already exist'))
        const hash = await bcrypt.hash(password,10)
        const newUser = new userModel({
            name,email,password:hash
        })
        const result = await newUser.save()
        const token = await jwt.sign({id:result._id,role:result.role},process.env.jwt_secret,{expiresIn:'1h'})
        res.cookie("access_token", token, {
            httpOnly: true,
          }).status(201).json({message:'register successfully',data:result,token:token},)
        
    } catch (error) {
        next(error)

    }

}

export const loginUser = async(req,res,next)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email:email})
        if(!user) return next(CreateError(400,'user does not exist!'))
    const verifyPassword = await bcrypt.compare(password,user.password)
    if(!verifyPassword) return next(CreateError(400,'email or password invalid!'))
    const token = await jwt.sign({id:user._id,role:user.role},process.env.jwt_secret,{expiresIn:'1h'})
    res.cookie("access_token", token, {
        httpOnly: true,
      }).status(200).json({message:'login successfully',data:user,token:token})
    } catch (error) {
        next(error)
        
    }

}

