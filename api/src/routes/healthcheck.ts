import healthcheck from '@/controllers/HealthcheckController.js';
import { Router } from 'express';

const router = Router();
router.route('/').get(healthcheck.healthcheck);
router.route('/email').get(healthcheck.testEmail);

export default router;
