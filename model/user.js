import jwt from 'jsonwebtoken'
import config from 'config';
import mongoose from 'mongoose';
import Joi from 'joi';
const userSchema = new mongoose.Schema({
    username:{type:String,required:true,minlength:3,maxlength:50},
    name :{type:String,required:true,minlength:3,maxlength:50},
    organization:{type:String,required:true,minlength:3,maxlength:50},
    designation:{type:String,required:true,minlength:3,maxlength:50},
    password:{type:String,required:true,minlength:3,maxlength:100},
})
userSchema.methods.generateAuthToken=function(){
return jwt.sign({_id:this._id},config.get('jwtPrivateKey'));
}
const User = new mongoose.model('user',userSchema);

function createUserValidation(user){
   const schema = Joi.object({
       username:Joi.string().required().min(3).max(50),
       name:Joi.string().required().min(3).max(50),
       organization:Joi.string().required().min(3).max(50),
       designation:Joi.string().required().min(3).max(50),
       password:Joi.string().required().min(3).max(100),


    })
   return schema.validate(user);
}
function validateLogin(user){
    const schema = Joi.object({
        username:Joi.string().required().min(3).max(50),
        password:Joi.string().required().min(3).max(100),
 
 
     })
     return schema.validate(user);
 }

export { User,createUserValidation as cUserValidate,validateLogin};