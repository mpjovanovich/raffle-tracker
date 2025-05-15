import { Router } from 'express';
import eventController from '../controllers/EventController.js';

const router = Router();
router.route('/').get(eventController.getAll);
router.route('/:id').put(eventController.upsert);

export default router;
