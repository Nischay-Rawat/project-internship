import mongoose from 'mongoose'
import config from 'config'
import express from 'express'
import state  from './routes/state.js'
import children  from './routes/children.js'
import user from './routes/user.js'
import district from './routes/district.js'
const app = express();

app.use(express.json());

mongoose.connect(config.get('db'))
.then(console.log(`Connected to ${config.get('db')}`));
app.use('/api/user',user);
app.use('/api/district',district)
app.use('/api/state',state);
app.use('/api/child',children);



const port = process.env.PORT||3000;

app.listen(port,()=>{
    console.log('Sir mai chal gya');
})