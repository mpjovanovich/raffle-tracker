import { Router } from 'express';
import orderController from '../controllers/OrderController.js';

const router = Router();

router.route('/:orderId').put(orderController.updateStatus);

export default router;
