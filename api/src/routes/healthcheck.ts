import { Router } from 'express';
import healthcheck from '../controllers/HealthcheckController.js';

const router = Router();
router.route('/').get(healthcheck.healthcheck);

export default router;
