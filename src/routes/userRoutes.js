import express from 'express';
import userController from '../controllers/controlUser';
import {isValidHost,isAuth} from '../middlewares/auth';

export const routerUsers = express.Router();

routerUsers.post('/login', userController.login);
routerUsers.post('/create', userController.createUser);
routerUsers.post('/update', userController.updateUser);
routerUsers.post('/delete', userController.deleteUser);
routerUsers.get('/family',isValidHost,isAuth, userController.getUser);


