import {Application} from 'express'
import routes from './appRoutes'

export default (app :Application):void => {
    app.use('/api/users', routes);
    app.use('/api/groups', routes);
};
