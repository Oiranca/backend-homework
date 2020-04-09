import express from 'express';
import userController from '../controllers/controlUserandGroup';

export const router = express.Router();

router.post('/create', userController.createUser);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);
router.get('/get-all', userController.getUser);


