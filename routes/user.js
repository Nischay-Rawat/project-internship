import express from 'express'
import User from '../model/user.js';
const router = express.Router();
router.post('/register',async(req,res)=>{
const { username,name,organization,designation,password}=req.body;
const ispresent= await User.findOne({username:username});
console.log(ispresent);
if(ispresent)return res.status(400).send("already username presented")
const user = await User( {username,name,organization,designation,password});

await user.save();
const token = user.generateAuthToken();
res.header('authtoken',token).send("created successfully\n",user,token);

})
router.post('/login',async (req,res)=>{
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