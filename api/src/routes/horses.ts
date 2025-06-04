import { Router } from 'express';
import horseController from '../controllers/HorseController.js';

const router = Router();

router.route('/:horseId').delete(horseController.delete);

export default router;
