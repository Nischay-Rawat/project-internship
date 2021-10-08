import mongoose from 'mongoose'
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

export default District;

