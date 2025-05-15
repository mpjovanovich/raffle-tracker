import { Router } from 'express';
import { fetchAll } from '../controllers/events.js';

const router = Router();
router.route('/').get(fetchAll);

export default router;
