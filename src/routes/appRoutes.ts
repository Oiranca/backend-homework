import express from 'express';
import homeController from '../controllers/controlGroup';
import userController from '../controllers/controlUser';
import tasksController from '../controllers/controlTask';
import {isValidHost,isAuth,isAdmin} from '../middlewares/auth';
//TODO: Informes,
const routers = express.Router();


routers.post('/update',isValidHost,isAuth,isAdmin, homeController.updateHome);
routers.post('/newtasks',isValidHost,isAuth,isAdmin, tasksController.createTasks);
routers.post('/assigntasks',isValidHost,isAuth,isAdmin, tasksController.assignTasks);
routers.get('/assigntasks',isValidHost,isAuth,isAdmin, tasksController.getTasks);
routers.post('/login',isValidHost, userController.login);
routers.post('/register/admin',isValidHost, userController.registerUser);
routers.post('/register/family',isValidHost, userController.registerUser);
routers.post('/update',isValidHost,isAuth, userController.updateUser);

routers.get('/profiles',isValidHost,isAuth, userController.getUser);
routers.get('/reports', isValidHost,isAuth,userController.getReport);
export default routers;

