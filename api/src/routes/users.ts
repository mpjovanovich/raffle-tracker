import userController from '@/controllers/UserController.js';
import { Router } from 'express';

const router = Router();

router.route('/').get(userController.getAllForList);
// TODO: update password
// TODO: update user
router.route('/').post(userController.createUser);
router.route('/:userId').put(userController.updateUser);
router.route('/:userId').get(userController.getById);
router.route('/:userId/roles').post(userController.addRoleToUser);

export default router;
