import express from 'express';
import homeController from '../controllers/controlGroup';
import userController from '../controllers/controlUser';
import tasksController from '../controllers/controlTask';
import {isValidHost,isAuth,isAdmin} from '../middlewares/auth';
//TODO: Informes, asignar tareas
const routers = express.Router();


routers.post('/update',isValidHost,isAuth,isAdmin, homeController.updateHome);
routers.post('/newtasks',isValidHost,isAuth,isAdmin, tasksController.createTasks);
routers.post('/login',isValidHost, userController.login);
routers.post('/register/admin',isValidHost, userController.registerUser);
routers.post('/register/family',isValidHost, userController.registerUser);
routers.post('/update',isValidHost,isAuth, userController.updateUser);

routers.get('/managefamily',isValidHost,isAuth, userController.getUser);
routers.get('/reports', isValidHost,isAuth,userController.getReport);
export default routers;
