import express from 'express';
import homeController from '../controllers/controlGroup';
import {isValidHost,isAuth,isAdmin} from '../middlewares/auth';

const routerGroup = express.Router();


routerGroup.post('/update', homeController.updateHome);


export default routerGroup;
