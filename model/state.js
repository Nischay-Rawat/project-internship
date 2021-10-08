import Joi from 'joi';
import mongoose from 'mongoose'

const stateSchema=new mongoose.Schema({
state_name:String,
state_id:Number,

})

const State = mongoose.model('state',stateSchema);
function validateState(state){
  const schema=  Joi.object({
      state_name:Joi.string().required().max(40),
      state_id:Joi.number().required().max(100),

  })
  return schema.validate(state);

}
export {State , validateState as validate };
