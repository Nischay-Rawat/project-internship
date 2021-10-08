import State from "../model/state.js"
import express from 'express';
const router = express.Router();


router.get('/',async(req,res)=>{
const state = await State.find();
    
res.send(state);
})
router.post('/',async(req,res)=>{
    const {state_id,state_name}=req.body;
    const state = new State({state_id,state_name});
    await state.save();
    res.send("Created"+state);
});
export default router;
