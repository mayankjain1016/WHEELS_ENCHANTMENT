import { Router } from 'express';
import * as galleryController from '../../../controllers/gallery.controller';
import { authenticate, authorize } from '../../../middleware/auth.middleware';
import { validate, validateParams } from '../../../middleware/validate.middleware';
import { uploadSingle, uploadMultiple, handleMulterError } from '../../../middleware/upload.middleware';
import { parseFormData } from '../../../middleware/parseFormData.middleware';
import { uploadLimiter } from '../../../middleware/rateLimit.middleware';
import {
  createGallerySchema,
  updateGallerySchema,
  galleryIdSchema,
  galleryQuerySchema
} from '../../../validators/gallery.validator';

const router = Router();

// Public routes
router.get('/', validate(galleryQuerySchema), galleryController.getGalleryImages);
router.get('/categories/list', galleryController.getGalleryCategories);
router.get('/:id', validateParams(galleryIdSchema), galleryController.getGalleryImageById);

// Protected routes (Admin only)
router.use(authenticate, authorize('admin', 'super_admin'));

router.post(
  '/',
  uploadLimiter,
  uploadSingle,
  handleMulterError,
  parseFormData,
  validate(createGallerySchema),
  galleryController.uploadGalleryImage
);

router.post(
  '/bulk',
  uploadLimiter,
  uploadMultiple,
  handleMulterError,
  parseFormData,
  galleryController.bulkUploadGalleryImages
);

router.put(
  '/:id',
  validateParams(galleryIdSchema),
  validate(updateGallerySchema),
  galleryController.updateGalleryImage
);

router.delete('/:id', validateParams(galleryIdSchema), galleryController.deleteGalleryImage);

router.post('/bulk-delete', galleryController.bulkDeleteGalleryImages);

export default router;
