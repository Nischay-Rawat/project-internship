import {Children,validate} from "../model/children.js"
import express from 'express';
const router = express.Router();


router.get('/',async(req,res)=>{
const child = await Children.find();
    
res.send(child);

})
router.post('/',async(req,res)=>{
    const {error}=validate(req.body);
    if(error)return res.status(400).send(error.message)
    const {name, sex,dob,father_name,mother_name,district_id,photo,}=req.body;
    const child= new Children({name, sex,dob,father_name,mother_name,district_id,photo,});
    await child.save();
    const token = child.generateAuthToken()
    console.log(token);
        res.header('Authorization',token).send("created Successfully\n"+child)
});
export default router;
