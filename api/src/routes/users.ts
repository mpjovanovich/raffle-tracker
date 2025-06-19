import userController from '@/controllers/UserController.js';
import { Router } from 'express';

const router = Router();

router.route('/').post(userController.createUser);
router.route('/:token/setTempToken').put(userController.setTempToken);
router.route('/:token/resetPassword').post(userController.resetPassword);

export default router;
