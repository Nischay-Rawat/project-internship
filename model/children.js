import config from 'config'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import Joi from 'joi'

const childSchema=new mongoose.Schema({
name:{type:String,required:true},
sex:{type:String,required:true,maxlength:15},
dob:{type:Date,required:true},
father_name:{type:String,default:null,},
mother_name:{type:String,default:null,},
district_id:String,
photo:{type:String,required:true},



})
childSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},config.get('jwtPrivateKey'))
    return token;
    }

const Children = mongoose.model('child',childSchema);
function validationChildren(children){
    const schema=Joi.object({
        name:Joi.string().required().min(3).max(50),
        sex:Joi.string().required().min(3).max(15),
        dob:Joi.date().required(),
        father_name:Joi.string(),
        mother_name:Joi.string(),
        district_id:Joi.myJoiObjectId().required(),
        photo:Joi.string().required(),

    })
    return schema.validate(children);
    }
export { Children,validationChildren as validate} ;
