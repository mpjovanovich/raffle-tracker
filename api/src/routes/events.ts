import { Router } from 'express';
import eventController from '../controllers/EventController.js';

const router = Router();
router.route('/').get(eventController.getAll);
router.route('/:id').get(eventController.getById);
router.route('/').post(eventController.insert);
router.route('/:id').put(eventController.update);

export default router;
