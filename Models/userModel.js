import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:'String',
        required:[true,'please tell us your name!'],
    },
    email:{
        type:'String',
        required:[true,'please tell us your email']
        
    },
    password:{
        type:'String',
        required:[true,'password is required']
    },
    role:{
        type:String,
        enum:['user','manager','admin'],
        default:'user'
    }
})
// userSchema.post('save',function(){
//     this.confirm_password = undefined

// })
export const userModel= mongoose.model('user',userSchema)
