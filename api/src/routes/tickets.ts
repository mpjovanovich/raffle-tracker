import ticketController from '@/controllers/TicketController.js';
import { Router } from 'express';

const router = Router();

router.route('/').post(ticketController.createTickets);

export default router;
