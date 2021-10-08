import jwt from 'jsonwebtoken'
import config from 'config';
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username:String,
    name : String,
    organization:String,
    designation:String,
    password:String,
})
userSchema.methods.generateAuthToken=function(){
return jwt.sign({_id:this._id},config.get('jwtPrivateKey'));
}
const User = new mongoose.model('user',userSchema);

export default User;