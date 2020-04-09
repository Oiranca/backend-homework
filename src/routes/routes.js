import { router as userRoutes } from './userRoutes';
import {router as groupRouter} from './groupRoutes'

export default (app) => {
  app.use('/api/users', userRoutes);
  app.use('/api/groups', groupRouter);
};
