import healthcheck from '@/controllers/HealthcheckController.js';
import { Router } from 'express';

const router = Router();
router.route('/').get(healthcheck.healthcheck);

export default router;
