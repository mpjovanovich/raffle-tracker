import reportController from '@/controllers/ReportController.js';
import { Router } from 'express';

const router = Router();

router
  .route('/eventSalesReport/:eventId')
  .get(reportController.getEventSalesReport);

export default router;
