import state  from '../routes/state.js'
import express from 'express'
import children  from '../routes/children.js'
import user from '../routes/user.js'
import district from '../routes/district.js'
export default (app)=>{
    //all api calls going to destination route
    app.use(express.json());
    app.use('/api/user',user);
    app.use('/api/district',district)
    app.use('/api/state',state);
    app.use('/api/child',children);
} 