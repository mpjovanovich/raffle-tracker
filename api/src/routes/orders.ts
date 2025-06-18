import orderController from '@/controllers/OrderController.js';
import { Router } from 'express';

const router = Router();

router.route('/:orderId').put(orderController.updateStatus);

export default router;
