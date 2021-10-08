import mongoose from 'mongoose'

const schema=new mongoose.Schema({
state_name:String,
state_id:Number,

})

const State = mongoose.model('state',schema);
export default State ;
