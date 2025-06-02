import { Router } from 'express';
import eventController from '../controllers/EventController.js';

const router = Router();

// GET
router.route('/').get(eventController.getAll);
router.route('/:id').get(eventController.getById);
router.route('/:id/races/:raceId').get(eventController.getRaceById);

// PUT
router.route('/:id').put(eventController.update);

// POST
router.route('/').post(eventController.insert);
router.route('/:id/races').post(eventController.addRace);

// DELETE
router.route('/:id/races/:raceId').delete(eventController.deleteRace);

export default router;
