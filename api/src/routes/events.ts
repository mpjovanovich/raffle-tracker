import { Router } from 'express';
import eventController from '../controllers/EventController.js';

const router = Router();

// GET
router.route('/').get(eventController.getAll);
router.route('/:id').get(eventController.getById);
router.route('/:id').get(eventController.getWithChildren);

// PUT
router.route('/:id').put(eventController.update);

// POST
router.route('/').post(eventController.insert);
router.route('/:id/races').post(eventController.addRaces);

export default router;
