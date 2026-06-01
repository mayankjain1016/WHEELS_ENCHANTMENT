import { Router } from 'express';
import { heroController } from '../../controllers/hero.controller';
import { authenticate, requireAdmin } from '../../middleware/auth.middleware';
import { uploadSingle } from '../../middleware/upload.middleware';

const router = Router();

router.get('/hero-slides', heroController.getAll);
router.get('/hero-slides/:id', heroController.getById);
router.post('/hero-slides', authenticate, requireAdmin, uploadSingle, heroController.create);
router.put('/hero-slides/:id', authenticate, requireAdmin, uploadSingle, heroController.update);
router.delete('/hero-slides/:id', authenticate, requireAdmin, heroController.delete);

export default router;
