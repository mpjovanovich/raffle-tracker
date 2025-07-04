import horseController from '@/controllers/HorseController.js';
import { Router } from 'express';

const router = Router();

router.route('/').post(horseController.createHorse);
router.route('/:horseId').delete(horseController.delete);
router.route('/:horseId/toggleScratch').patch(horseController.toggleScratch);
router.route('/:horseId/toggleWinner').patch(horseController.toggleWinner);

export default router;
