import { routerUsers as userRoutes } from './userRoutes';
import {routerGroup as groupRouter} from './groupRoutes'

export default (app) => {
  app.use('/api/users', userRoutes);
  app.use('/api/groups', groupRouter);
};
