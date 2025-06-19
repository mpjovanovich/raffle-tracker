import userController from '@/controllers/UserController.js';
import { Router } from 'express';

const router = Router();

router.route('/').post(userController.createUser);
router.route('/:token/setTempToken').put(userController.setTempToken);

export default router;
