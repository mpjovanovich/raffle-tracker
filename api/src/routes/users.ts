import userController from '@/controllers/UserController.js';
import { Router } from 'express';

const router = Router();

router.route('/').get(userController.getAllForList);
router.route('/').post(userController.createUser);
router.route('/roles').get(userController.getAllRoles);
router.route('/:userId').put(userController.updateUser);
router.route('/:userId').get(userController.getById);
router.route('/:userId/password').put(userController.updatePassword);
router.route('/:userId/roles/:roleId').put(userController.toggleRole);

export default router;
