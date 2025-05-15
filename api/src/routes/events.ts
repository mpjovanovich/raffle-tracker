import { Router } from 'express';
import eventController from '../controllers/EventController.js';

const router = Router();
router.route('/').get(eventController.getAll);

export default router;
