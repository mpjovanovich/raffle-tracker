import authController from '@/controllers/AuthController.js';
import { Router } from 'express';

const router = Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/logout/:userId').post(authController.logout);
router.route('/:token/resetPassword').post(authController.resetPassword);

export default router;
