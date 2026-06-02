import { Router } from 'express';
import * as reviewController from '../../../controllers/review.controller';
import { authenticate, authorize } from '../../../middleware/auth.middleware';

const router = Router();

router.post('/', reviewController.createReview);
router.get('/approved', reviewController.getApprovedReviews);
router.get('/', authenticate, authorize('admin', 'super_admin'), reviewController.getReviews);
router.get('/:id', authenticate, authorize('admin', 'super_admin'), reviewController.getReviewById);
router.put('/:id', authenticate, authorize('admin', 'super_admin'), reviewController.updateReview);
router.patch('/:id/approve', authenticate, authorize('admin', 'super_admin'), reviewController.approveReview);
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), reviewController.deleteReview);

export default router;
