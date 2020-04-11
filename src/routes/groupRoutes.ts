import express from 'express';
import homeController from '../controllers/controlGroup';

const routerGroup = express.Router();

routerGroup.post('/create', homeController.createHome);
routerGroup.post('/update', homeController.updateHome);
routerGroup.post('/delete', homeController.deleteHome);
routerGroup.get('/all', homeController.getHome);

export default routerGroup;
