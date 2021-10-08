import express from 'express'
import {User, cUserValidate,validateLogin} from '../model/user.js';
const router = express.Router();
router.post('/register',async(req,res)=>{
    const {error}=cUserValidate(req.body);
    if(error)return res.status(400).send(error.message)
    const { username,name,organization,designation,password}=req.body;
    const ispresent= await User.findOne({username:username});

    if(ispresent)return res.status(400).send("already username presented")
    const user = await User( {username,name,organization,designation,password});

    await user.save();
    const token = user.generateAuthToken();
    res.header('authtoken',token).send("created successfully\n",user,token);

})
router.post('/login',async (req,res)=>{
    const {error}=validateLogin(req.body);
    if(error)return res.status(400).send(error.message)
    const {username,password}= req.body;
    const user =await User.findOne({username});
    if(!username)return res.status(404).send("username or password is incorrect");
    if(password!==user.password)return res.status(404).send("username or password is incorrect");
    const token=user.generateAuthToken();
    res.header('authtoken',token).send("true");
})


router.post('/logout',(req,res)=>{
    res.removeHeader('authtoken');
    res.send('logout successfully')
})
export default router;