import mongoose from 'mongoose'
import Joi from 'joi'
const districtSchema=new mongoose.Schema({
    state_id:{
        type:Number,
        required:true,

    },
    district_name:{
        type:String,
        required:true,
    }
    
})
const District = new mongoose.model('District',districtSchema);

function validateDistrict(district){
    const schema=Joi.object({
       state_id:Joi.number().required(),
       district_name:Joi.string().required()

    })
    return schema.validate(district);
    }
export {District ,validateDistrict as validate};

