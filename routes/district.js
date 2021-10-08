import express from 'express'
import {District,validate} from '../model/district.js';
const router = express.Router();
//for(/api/district)


router.get('/',async(req,res)=>{
    const query=req.query.state_id;
    if(!query)return res.status(400).send("please provide state_id");
    const district = await District.find({state_id:query});
    res.send(district); 
})
router.post('/',async(req,res)=>{
    const {error}=validate(req.body);
    if(error)return res.status(400).send(error.message)
    const {state_id,district_name}=req.body;
    const district=await new District({state_id,district_name});
    await district.save();
    res.send("save successfully");
})
export default router;