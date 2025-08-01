import authController from '@/controllers/AuthController.js';
import { Router } from 'express';

const router = Router();

router.route('/login').post(authController.login);

export default router;
