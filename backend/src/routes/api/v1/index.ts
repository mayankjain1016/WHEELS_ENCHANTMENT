import { Router } from 'express';
import authRoutes from './auth.routes';
import coachRoutes from './coaches.routes';
import productRoutes from './products.routes';
import categoryRoutes from './categories.routes';
import galleryRoutes from './gallery.routes';
import leadRoutes from './leads.routes';
import reviewRoutes from './reviews.routes';
import heroRoutes from './hero.routes';
import { locationRouter, testimonialRouter, settingRouter } from './misc.routes';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/coaches', coachRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/gallery', galleryRoutes);
router.use('/leads', leadRoutes);
router.use('/reviews', reviewRoutes);
router.use(heroRoutes);
router.use('/locations', locationRouter);
router.use('/testimonials', testimonialRouter);
router.use('/settings', settingRouter);

export default router;
