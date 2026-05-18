import { Router } from 'express';
import * as coachController from '../../../controllers/coach.controller';
import { authenticate, authorize } from '../../../middleware/auth.middleware';
import { validate, validateParams } from '../../../middleware/validate.middleware';
import { uploadSingle, handleMulterError } from '../../../middleware/upload.middleware';
import { parseFormData } from '../../../middleware/parseFormData.middleware';
import {
  createCoachSchema,
  updateCoachSchema,
  coachIdSchema,
  coachQuerySchema
} from '../../../validators/coach.validator';

const router = Router();

// Public routes
router.get('/', validate(coachQuerySchema), coachController.getCoaches);
router.get('/:id', validateParams(coachIdSchema), coachController.getCoachById);

// Protected routes (Admin only)
router.use(authenticate, authorize('admin', 'super_admin'));

router.post(
  '/',
  uploadSingle,
  handleMulterError,
  parseFormData,
  validate(createCoachSchema),
  coachController.createCoach
);

router.put(
  '/:id',
  validateParams(coachIdSchema),
  uploadSingle,
  handleMulterError,
  parseFormData,
  validate(updateCoachSchema),
  coachController.updateCoach
);

router.delete('/:id', validateParams(coachIdSchema), coachController.deleteCoach);

router.patch('/:id/order', validateParams(coachIdSchema), coachController.updateCoachOrder);
router.patch('/:id/toggle-active', validateParams(coachIdSchema), coachController.toggleCoachActive);
router.patch('/:id/toggle-featured', validateParams(coachIdSchema), coachController.toggleCoachFeatured);

export default router;
