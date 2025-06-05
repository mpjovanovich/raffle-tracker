import { Router } from 'express';
import contestController from '../controllers/ContestController.js';

const router = Router();

router.route('/').post(contestController.createContest);
router.route('/:contestId').get(contestController.getById);
router.route('/:contestId').delete(contestController.delete);

export default router;
