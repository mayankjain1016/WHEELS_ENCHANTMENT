import { Router } from 'express';
import * as productController from '../../../controllers/product.controller';
import { authenticate, authorize } from '../../../middleware/auth.middleware';
import { validate, validateParams } from '../../../middleware/validate.middleware';
import { uploadMultiple, handleMulterError } from '../../../middleware/upload.middleware';
import { parseFormData } from '../../../middleware/parseFormData.middleware';
import {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
  productSlugSchema,
  productQuerySchema
} from '../../../validators/product.validator';

const router = Router();

// Public routes
router.get('/', validate(productQuerySchema), productController.getProducts);
router.get('/slug/:slug', validateParams(productSlugSchema), productController.getProductBySlug);
router.get('/:id', validateParams(productIdSchema), productController.getProductById);

// Protected routes (Admin only)
router.use(authenticate, authorize('admin', 'super_admin'));

router.post(
  '/',
  uploadMultiple,
  handleMulterError,
  parseFormData,
  validate(createProductSchema),
  productController.createProduct
);

router.put(
  '/:id',
  validateParams(productIdSchema),
  validate(updateProductSchema),
  productController.updateProduct
);

router.post(
  '/:id/images',
  validateParams(productIdSchema),
  uploadMultiple,
  handleMulterError,
  parseFormData,
  productController.addProductImages
);

router.delete(
  '/:id/images/:filename',
  validateParams(productIdSchema),
  productController.deleteProductImage
);

router.delete('/:id', validateParams(productIdSchema), productController.deleteProduct);

router.patch('/:id/stock', validateParams(productIdSchema), productController.updateProductStock);

export default router;
