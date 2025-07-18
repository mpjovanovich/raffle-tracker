import reportController from '@/controllers/ReportController.js';
import { Router } from 'express';

const router = Router();

router.route('/revenueReport/:eventId').get(reportController.getRevenueReport);

export default router;
