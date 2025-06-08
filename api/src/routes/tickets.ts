import { Router } from 'express';
import ticketController from '../controllers/TicketController.js';

const router = Router();

router.route('/').post(ticketController.createTickets);

export default router;
