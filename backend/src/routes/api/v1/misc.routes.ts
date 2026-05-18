import { Router } from 'express';
import * as miscController from '../../../controllers/misc.controller';
import { authenticate, authorize } from '../../../middleware/auth.middleware';

// ============ LOCATION ROUTES ============
const locationRouter = Router();

locationRouter.get('/', miscController.getLocations);

locationRouter.use(authenticate, authorize('admin', 'super_admin'));
locationRouter.post('/', miscController.createLocation);
locationRouter.put('/:id', miscController.updateLocation);
locationRouter.delete('/:id', miscController.deleteLocation);

// ============ TESTIMONIAL ROUTES ============
const testimonialRouter = Router();

testimonialRouter.get('/', miscController.getTestimonials);

testimonialRouter.use(authenticate, authorize('admin', 'super_admin'));
testimonialRouter.get('/all', miscController.getAllTestimonials);
testimonialRouter.post('/', miscController.createTestimonial);
testimonialRouter.put('/:id', miscController.updateTestimonial);
testimonialRouter.patch('/:id/approve', miscController.approveTestimonial);
testimonialRouter.delete('/:id', miscController.deleteTestimonial);

// ============ SETTING ROUTES ============
const settingRouter = Router();

settingRouter.get('/public', miscController.getPublicSettings);

settingRouter.use(authenticate, authorize('admin', 'super_admin'));
settingRouter.get('/', miscController.getSettings);
settingRouter.get('/:key', miscController.getSettingByKey);
settingRouter.put('/:key', miscController.updateSetting);
settingRouter.delete('/:key', miscController.deleteSetting);

export { locationRouter, testimonialRouter, settingRouter };
