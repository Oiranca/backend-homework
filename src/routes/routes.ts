import {Application} from 'express'
import  userRoutes  from './userRoutes';
import  groupRouter from './groupRoutes'

export default (app :Application):void => {
    app.use('/api/users', userRoutes);
    app.use('/api/groups', groupRouter);
};
