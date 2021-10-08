import express from 'express'
import Joi from 'joi'
import JoiObjectId from 'joi-objectid'
import routes from './startup/routes.js'

Joi.myJoiObjectId=JoiObjectId(Joi);

const app = express();
routes(app);
import db from './startup/db.js';
db();

const port = process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`Server is listening on port no ${port}`);
})