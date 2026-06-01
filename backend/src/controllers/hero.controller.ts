import { Request, Response } from 'express';
import HeroSlide from '../models/HeroSlide';
import imageProcessor from '../services/image.service';
import ApiError from '../utils/ApiError';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';

export const heroController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const { isActive } = req.query;
    const filter: any = {};
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const slides = await HeroSlide.find(filter).sort({ displayOrder: 1 });
    ApiResponse.success(res, slides, 'Hero slides retrieved successfully');
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const slide = await HeroSlide.findById(req.params.id);
    if (!slide) {
      throw ApiError.notFound('Hero slide not found');
    }
    ApiResponse.success(res, slide, 'Hero slide retrieved successfully');
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const { title, subtitle, ctaText, ctaLink, displayOrder, isActive } = req.body;
    const file = req.file;

    if (!file) {
      throw ApiError.badRequest('Image is required');
    }

    // Validate image
    const validation = imageProcessor.validateImage(file);
    if (!validation.valid) {
      throw ApiError.badRequest(validation.error!);
    }

    // Process image
    const processedImage = await imageProcessor.processImage(file.buffer, 'hero');
    
    const slide = await HeroSlide.create({
      title,
      subtitle,
      image: {
        url: processedImage.optimized.url,
        thumbnail: processedImage.thumbnail.url,
        alt: title || 'Hero slide',
        filename: processedImage.filename
      },
      ctaText,
      ctaLink,
      displayOrder: displayOrder || 0,
      isActive: isActive !== undefined ? isActive : true
    });

    ApiResponse.created(res, slide, 'Hero slide created successfully');
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { title, subtitle, ctaText, ctaLink, displayOrder, isActive } = req.body;
    const file = req.file;

    const slide = await HeroSlide.findById(req.params.id);
    if (!slide) {
      throw ApiError.notFound('Hero slide not found');
    }

    if (file) {
      // Validate image
      const validation = imageProcessor.validateImage(file);
      if (!validation.valid) {
        throw ApiError.badRequest(validation.error!);
      }

      // Delete old image
      if (slide.image?.filename) {
        await imageProcessor.deleteImage(slide.image.filename, 'hero');
      }

      // Process new image
      const processedImage = await imageProcessor.processImage(file.buffer, 'hero');
      slide.image = {
        url: processedImage.optimized.url,
        thumbnail: processedImage.thumbnail.url,
        alt: title || slide.title || 'Hero slide',
        filename: processedImage.filename
      };
    }

    if (title !== undefined) slide.title = title;
    if (subtitle !== undefined) slide.subtitle = subtitle;
    if (ctaText !== undefined) slide.ctaText = ctaText;
    if (ctaLink !== undefined) slide.ctaLink = ctaLink;
    if (displayOrder !== undefined) slide.displayOrder = displayOrder;
    if (isActive !== undefined) slide.isActive = isActive;

    await slide.save();
    ApiResponse.success(res, slide, 'Hero slide updated successfully');
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const slide = await HeroSlide.findById(req.params.id);
    if (!slide) {
      throw ApiError.notFound('Hero slide not found');
    }

    // Delete image
    if (slide.image?.filename) {
      await imageProcessor.deleteImage(slide.image.filename, 'hero');
    }

    await slide.deleteOne();
    ApiResponse.success(res, null, 'Hero slide deleted successfully');
  })
};
