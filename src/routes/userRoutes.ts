import express from 'express';
import userController from '../controllers/controlUser';
import {isValidHost,isAuth,isAdmin} from '../middlewares/auth';

const routerUsers = express.Router();

routerUsers.post('/login', userController.login);
routerUsers.post('/create', userController.createUser);
routerUsers.post('/update', userController.updateUser);
routerUsers.post('/delete', userController.deleteUser);
routerUsers.get('/family',isValidHost,isAuth,isAdmin, userController.getUser);

export default routerUsers;
