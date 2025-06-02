import { Router } from 'express';
import eventController from '../controllers/EventController.js';

const router = Router();

// EVENTS
router.route('/').get(eventController.getAll);
router.route('/').post(eventController.insert);
router.route('/:eventId').get(eventController.getById);
router.route('/:eventId').put(eventController.update);

router.route('/:eventId/races/:raceId').get(eventController.getRaceById);
router.route('/:eventId/races').post(eventController.addRace);
router.route('/:eventId/races/:raceId').delete(eventController.deleteRace);

export default router;
