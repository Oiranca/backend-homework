import express from 'express';
import userController from '../controllers/controlUser';

export const routerUsers = express.Router();

routerUsers.post('/login', userController.login);
routerUsers.post('/create', userController.createUser);
routerUsers.post('/update', userController.updateUser);
routerUsers.post('/delete', userController.deleteUser);
routerUsers.get('/family', userController.getUser);


