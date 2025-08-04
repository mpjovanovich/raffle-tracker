import userController from '@/controllers/UserController.js';
import { Router } from 'express';

const router = Router();

router.route('/').get(userController.getAllForList);
// To be replaced with upsert
// router.route('/').post(userController.createUser);
router.route('/:userId').get(userController.getById);
router.route('/:userId/roles').post(userController.addRoleToUser);

export default router;
