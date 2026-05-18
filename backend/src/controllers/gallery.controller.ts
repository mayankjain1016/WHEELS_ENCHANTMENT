import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';
import Gallery from '../models/Gallery';
import imageProcessor from '../services/image.service';
import { paginate, getPaginationParams } from '../utils/pagination';

/**
 * @route   GET /api/v1/gallery
 * @desc    Get all gallery images
 * @access  Public
 */
export const getGalleryImages = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, sort } = getPaginationParams(req.query);
  const { category, tags, isActive, search } = req.query;

  // Build filter
  const filter: any = {};
  
  if (category) filter.category = category;
  if (isActive !== undefined) filter.isActive = isActive === 'true';
  if (tags) {
    const tagArray = (tags as string).split(',').map(t => t.trim().toLowerCase());
    filter.tags = { $in: tagArray };
  }
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { caption: { $regex: search, $options: 'i' } }
    ];
  }

  // Query with pagination
  const query = Gallery.find(filter);
  const result = await paginate(query, { page, limit, sort: sort || '-uploadDate' });

  ApiResponse.paginated(
    res,
    result.data,
    result.pagination.page,
    result.pagination.limit,
    result.pagination.total,
    'Gallery images retrieved successfully'
  );
});

/**
 * @route   GET /api/v1/gallery/:id
 * @desc    Get gallery image by ID
 * @access  Public
 */
export const getGalleryImageById = asyncHandler(async (req: Request, res: Response) => {
  const image = await Gallery.findById(req.params.id);

  if (!image) {
    throw ApiError.notFound('Gallery image not found');
  }

  ApiResponse.success(res, { image }, 'Gallery image retrieved successfully');
});

/**
 * @route   POST /api/v1/gallery
 * @desc    Upload single gallery image
 * @access  Private (Admin)
 */
export const uploadGalleryImage = asyncHandler(async (req: Request, res: Response) => {
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
  const processedImage = await imageProcessor.processImage(file.buffer, 'gallery');

  // Create gallery entry
  const image = await Gallery.create({
    ...req.body,
    image: {
      url: processedImage.optimized.url,
      thumbnail: processedImage.thumbnail.url,
      alt: req.body.title || '',
      filename: processedImage.filename,
      width: processedImage.optimized.width,
      height: processedImage.optimized.height
    }
  });

  ApiResponse.created(res, { image }, 'Image uploaded successfully');
});

/**
 * @route   POST /api/v1/gallery/bulk
 * @desc    Upload multiple gallery images
 * @access  Private (Admin)
 */
export const bulkUploadGalleryImages = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    throw ApiError.badRequest('No images provided');
  }

  const { category, tags } = req.body;

  if (!category) {
    throw ApiError.badRequest('Category is required for bulk upload');
  }

  const uploadedImages: any[] = [];

  for (const file of files) {
    const validation = imageProcessor.validateImage(file);
    if (!validation.valid) {
      continue; // Skip invalid images
    }

    try {
      const processedImage = await imageProcessor.processImage(file.buffer, 'gallery');

      const image = await Gallery.create({
        category,
        tags: tags ? tags.split(',').map((t: string) => t.trim().toLowerCase()) : [],
        image: {
          url: processedImage.optimized.url,
          thumbnail: processedImage.thumbnail.url,
          alt: '',
          filename: processedImage.filename,
          width: processedImage.optimized.width,
          height: processedImage.optimized.height
        }
      });

      uploadedImages.push(image);
    } catch (error) {
      console.error('Failed to process image:', error);
      continue;
    }
  }

  ApiResponse.created(
    res,
    { images: uploadedImages, count: uploadedImages.length },
    `${uploadedImages.length} images uploaded successfully`
  );
});

/**
 * @route   PUT /api/v1/gallery/:id
 * @desc    Update gallery image
 * @access  Private (Admin)
 */
export const updateGalleryImage = asyncHandler(async (req: Request, res: Response) => {
  const image = await Gallery.findById(req.params.id);

  if (!image) {
    throw ApiError.notFound('Gallery image not found');
  }

  // Update fields
  if (req.body.title !== undefined) image.title = req.body.title;
  if (req.body.caption !== undefined) image.caption = req.body.caption;
  if (req.body.category !== undefined) image.category = req.body.category;
  if (req.body.tags !== undefined) image.tags = req.body.tags;
  if (req.body.displayOrder !== undefined) image.displayOrder = req.body.displayOrder;
  if (req.body.isActive !== undefined) image.isActive = req.body.isActive;

  // Update alt text if title changed
  if (req.body.title) {
    image.image.alt = req.body.title;
  }

  await image.save();

  ApiResponse.success(res, { image }, 'Gallery image updated successfully');
});

/**
 * @route   DELETE /api/v1/gallery/:id
 * @desc    Delete gallery image
 * @access  Private (Admin)
 */
export const deleteGalleryImage = asyncHandler(async (req: Request, res: Response) => {
  const image = await Gallery.findById(req.params.id);

  if (!image) {
    throw ApiError.notFound('Gallery image not found');
  }

  // Delete image file
  if (image.image?.filename) {
    await imageProcessor.deleteImage(image.image.filename, 'gallery');
  }

  await image.deleteOne();

  ApiResponse.success(res, null, 'Gallery image deleted successfully');
});

/**
 * @route   DELETE /api/v1/gallery/bulk
 * @desc    Bulk delete gallery images
 * @access  Private (Admin)
 */
export const bulkDeleteGalleryImages = asyncHandler(async (req: Request, res: Response) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw ApiError.badRequest('Image IDs are required');
  }

  const images = await Gallery.find({ _id: { $in: ids } });

  // Delete image files
  for (const image of images) {
    if (image.image?.filename) {
      await imageProcessor.deleteImage(image.image.filename, 'gallery');
    }
  }

  // Delete from database
  await Gallery.deleteMany({ _id: { $in: ids } });

  ApiResponse.success(res, { deletedCount: images.length }, 'Images deleted successfully');
});

/**
 * @route   GET /api/v1/gallery/categories/list
 * @desc    Get gallery categories with counts
 * @access  Public
 */
export const getGalleryCategories = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await Gallery.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const result = categories.map(cat => ({
    category: cat._id,
    count: cat.count
  }));

  ApiResponse.success(res, { categories: result }, 'Gallery categories retrieved successfully');
});
