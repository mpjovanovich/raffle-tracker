import userController from '@/controllers/UserController.js';
import { Router } from 'express';

const router = Router();

router.route('/').get(userController.getAllForList);
router.route('/').post(userController.createUser);
router.route('/:userId/roles').post(userController.addRoleToUser);

export default router;
