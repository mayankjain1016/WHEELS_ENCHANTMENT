import { Router } from 'express';
import * as authController from '../../../controllers/auth.controller';
import { authenticate, authorize } from '../../../middleware/auth.middleware';
import { validate } from '../../../middleware/validate.middleware';
import { authLimiter } from '../../../middleware/rateLimit.middleware';
import {
  loginSchema,
  registerSchema,
  changePasswordSchema
} from '../../../validators/auth.validator';

const router = Router();

// Public routes
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/refresh', authController.refreshToken);

// Protected routes
router.use(authenticate);
router.post('/logout', authController.logout);
router.get('/me', authController.getCurrentUser);
router.post('/change-password', validate(changePasswordSchema), authController.changePassword);

// Super admin only
router.post('/register', authorize('super_admin'), validate(registerSchema), authController.register);

export default router;
