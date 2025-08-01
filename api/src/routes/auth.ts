import authController from '@/controllers/AuthController.js';
import { Router } from 'express';

const router = Router();

// router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
// router.route('/resetPassword').post(authController.resetPassword);

export default router;
