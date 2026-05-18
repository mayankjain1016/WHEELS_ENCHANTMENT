import { Router } from 'express';
import * as categoryController from '../../../controllers/category.controller';
import { authenticate, authorize } from '../../../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/:categoryId/subcategories', categoryController.getSubcategories);

// Protected routes (Admin only)
router.use(authenticate, authorize('admin', 'super_admin'));

// Categories
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

// Subcategories
router.post('/subcategories', categoryController.createSubcategory);
router.put('/subcategories/:id', categoryController.updateSubcategory);
router.delete('/subcategories/:id', categoryController.deleteSubcategory);

export default router;
