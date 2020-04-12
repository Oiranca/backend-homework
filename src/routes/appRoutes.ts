import express from 'express';
import homeController from '../controllers/controlGroup';
import userController from '../controllers/controlUser';
import {isValidHost,isAuth,isAdmin} from '../middlewares/auth';
//TODO: Como veríficar si es administrador o no
const routers = express.Router();


routers.post('/update',isValidHost,isAuth,isAdmin, homeController.updateHome);
routers.post('/delete',isValidHost,isAuth, userController.deleteUser);


routers.post('/login',isValidHost, userController.login);
routers.post('/register',isValidHost, userController.registerUser);

routers.post('/update',isValidHost,isAuth, userController.updateUser);

// routers.get('/family',isValidHost,isAuth,userController.getUser);
routers.get('/family',isValidHost,isAuth,userController.getUser);
export default routers;
