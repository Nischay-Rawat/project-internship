import config from 'config'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const childSchema=new mongoose.Schema({
name:String,
sex:String,
dob:Date,
father_name:String,
mother_name:String,
district_id:String,
photo:String,



})
childSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},config.get('jwtPrivateKey'))
    return token;
    }

const Children = mongoose.model('child',childSchema);
export { Children,childSchema} ;
