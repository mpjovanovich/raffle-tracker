import userController from '@/controllers/UserController.js';
import { Router } from 'express';

const router = Router();

router.route('/').post(userController.createUser);
router.route('/verify/:token').get(userController.verifyUser);

export default router;
