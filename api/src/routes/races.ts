import { Router } from 'express';
import raceController from '../controllers/RaceController.js';

const router = Router();

router.route('/').post(raceController.createRace);
router.route('/:raceId').get(raceController.getById);
router.route('/:raceId').delete(raceController.delete);
router.route('/:raceId').post(raceController.createRace);

export default router;
