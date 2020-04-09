import { router as userRoutes } from './userRoutes';

export default (app) => {
  app.use('/api/users', userRoutes);
};
