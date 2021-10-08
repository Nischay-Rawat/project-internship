import mongoose from 'mongoose';
import config from 'config'

export default ()=>{
    const db=config.get('db');
    mongoose.connect(db)
    .then(()=>console.log(`Connected to ${db}`))

   

}