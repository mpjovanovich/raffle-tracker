import userController from '@/controllers/UserController.js';
import { Router } from 'express';

const router = Router();

router.route('/').get(userController.getAllForList);
router.route('/').post(userController.createUser);

export default router;
