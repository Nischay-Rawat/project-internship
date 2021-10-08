import express from 'express'
import bcrypt from 'bcrypt'
import {User, cUserValidate,validateLogin} from '../model/user.js';
const router = express.Router();
router.post('/register',async(req,res)=>{
    const {error}=cUserValidate(req.body);
    if(error)return res.status(400).send(error.message)
    const { username,name,organization,designation,password}=req.body;

    const ispresent= await User.findOne({username:username});
    if(ispresent)return res.status(400).send("already username presented")
    
    const user = await User( {username,name,organization,designation,password});
    const salt= await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(password,salt);

    await user.save();
    const token = user.generateAuthToken();
    res.header('authtoken',token).send("created successfully\n",username,token);

})
router.post('/login',async (req,res)=>{
    const {error}=validateLogin(req.body);
    if(error)return res.status(400).send(error.message)
    const {username,password}= req.body;
    const user =await User.findOne({username});
    if(!user)return res.status(404).send("username or password is incorrect");
  
    const validPassword= await bcrypt.compare(password,user.password)
    if(!validPassword)return res.status(404).send("username or password is incorrect")
    const token=user.generateAuthToken();
    res.header('authtoken',token).send("logged in Sucessfully");
})

// here only removing the jwt 
router.post('/logout',(req,res)=>{
    res.removeHeader('authtoken');
    res.send('logout successfully')
})
export default router;