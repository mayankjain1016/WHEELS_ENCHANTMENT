import { Router } from 'express';
import * as leadController from '../../../controllers/lead.controller';
import { authenticate, authorize } from '../../../middleware/auth.middleware';
import { validate, validateParams } from '../../../middleware/validate.middleware';
import { leadLimiter } from '../../../middleware/rateLimit.middleware';
import {
  createLeadSchema,
  updateLeadSchema,
  updateLeadStatusSchema,
  assignLeadSchema,
  addNoteSchema,
  leadIdSchema,
  leadQuerySchema
} from '../../../validators/lead.validator';

const router = Router();

// Public route - Form submission
router.post('/', leadLimiter, validate(createLeadSchema), leadController.createLead);

// Protected routes (Admin only)
router.use(authenticate, authorize('admin', 'super_admin'));

router.get('/', validate(leadQuerySchema), leadController.getLeads);
router.get('/stats/dashboard', leadController.getLeadStats);
router.get('/:id', validateParams(leadIdSchema), leadController.getLeadById);

router.put('/:id', validateParams(leadIdSchema), validate(updateLeadSchema), leadController.updateLead);

router.patch('/:id/status', validateParams(leadIdSchema), validate(updateLeadStatusSchema), leadController.updateLeadStatus);

router.patch('/:id/assign', validateParams(leadIdSchema), validate(assignLeadSchema), leadController.assignLead);

router.post('/:id/notes', validateParams(leadIdSchema), validate(addNoteSchema), leadController.addLeadNote);

router.delete('/:id', validateParams(leadIdSchema), leadController.deleteLead);

export default router;
