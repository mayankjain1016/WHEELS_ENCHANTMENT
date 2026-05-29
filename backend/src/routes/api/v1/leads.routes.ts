import { Router } from 'express';
import * as leadController from '../../../controllers/lead.controller';
import { authenticate, authorize } from '../../../middleware/auth.middleware';
import { validate, validateParams } from '../../../middleware/validate.middleware';
import { leadLimiter } from '../../../middleware/rateLimit.middleware';
import { uploadFields, handleMulterError } from '../../../middleware/upload.middleware';
import { parseFormData } from '../../../middleware/parseFormData.middleware';
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

// Debug middleware for leads route
router.use((req, res, next) => {
  if (req.path === '/' && req.method === 'POST') {
    console.log('=== LEADS ROUTE DEBUG ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Method:', req.method);
    console.log('Path:', req.path);
    console.log('Origin:', req.headers.origin);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('User-Agent:', req.headers['user-agent']);
  }
  next();
});

// Public route - Form submission with file uploads
router.post('/', leadLimiter, uploadFields, handleMulterError, parseFormData, validate(createLeadSchema), leadController.createLead);

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
