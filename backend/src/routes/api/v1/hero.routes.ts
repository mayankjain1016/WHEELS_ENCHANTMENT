import { Router } from 'express';
import { heroController } from '../../../controllers/hero.controller';
import { authenticate, authorize } from '../../../middleware/auth.middleware';
import { uploadSingle } from '../../../middleware/upload.middleware';

const router = Router();

router.get('/hero-slides', heroController.getAll);
router.get('/hero-slides/:id', heroController.getById);
router.post('/hero-slides', authenticate, authorize('admin'), uploadSingle, heroController.create);
router.put('/hero-slides/:id', authenticate, authorize('admin'), uploadSingle, heroController.update);
router.delete('/hero-slides/:id', authenticate, authorize('admin'), heroController.delete);

export default router;
