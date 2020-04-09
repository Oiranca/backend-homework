import express from 'express';
import userController from '../controllers/controlUser';

export const router = express.Router();

router.post('/create', userController.createUser);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);
router.get('/family', userController.getUser);


