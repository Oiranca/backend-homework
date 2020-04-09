import express from 'express';
import homeController from '../controllers/controlGroup';

export const router = express.Router();

router.post('/create', homeController.createHome);
router.post('/update', homeController.updateHome);
router.post('/delete', homeController.deleteHome);
router.get('/family', homeController.getHome);
