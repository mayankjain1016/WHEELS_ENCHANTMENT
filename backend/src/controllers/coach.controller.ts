import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';
import Coach from '../models/Coach';
import imageProcessor from '../services/image.service';
import { paginate, getPaginationParams } from '../utils/pagination';

/**
 * @route   GET /api/v1/coaches
 * @desc    Get all coaches
 * @access  Public
 */
export const getCoaches = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, sort } = getPaginationParams(req.query);
  const { isActive, isFeatured, search } = req.query;

  // Build filter
  const filter: any = {};
  
  if (isActive !== undefined) {
    filter.isActive = isActive === 'true';
  }
  
  if (isFeatured !== undefined) {
    filter.isFeatured = isFeatured === 'true';
  }
  
  if (search) {
    filter.$text = { $search: search as string };
  }

  // Query with pagination
  const query = Coach.find(filter);
  const result = await paginate(query, { page, limit, sort });

  ApiResponse.paginated(
    res,
    result.data,
    result.pagination.page,
    result.pagination.limit,
    result.pagination.total,
    'Coaches retrieved successfully'
  );
});

/**
 * @route   GET /api/v1/coaches/:id
 * @desc    Get coach by ID
 * @access  Public
 */
export const getCoachById = asyncHandler(async (req: Request, res: Response) => {
  const coach = await Coach.findById(req.params.id);

  if (!coach) {
    throw ApiError.notFound('Coach not found');
  }

  ApiResponse.success(res, { coach }, 'Coach retrieved successfully');
});

/**
 * @route   POST /api/v1/coaches
 * @desc    Create new coach
 * @access  Private (Admin)
 */
export const createCoach = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    throw ApiError.badRequest('Coach image is required');
  }

  // Validate image
  const validation = imageProcessor.validateImage(file);
  if (!validation.valid) {
    throw ApiError.badRequest(validation.error!);
  }

  // Process image
  const processedImage = await imageProcessor.processImage(file.buffer, 'coaches');

  // Create coach
  const coach = await Coach.create({
    ...req.body,
    image: {
      url: processedImage.optimized.url,
      thumbnail: processedImage.thumbnail.url,
      alt: req.body.name || '',
      filename: processedImage.filename
    }
  });

  ApiResponse.created(res, { coach }, 'Coach created successfully');
});

/**
 * @route   PUT /api/v1/coaches/:id
 * @desc    Update coach
 * @access  Private (Admin)
 */
export const updateCoach = asyncHandler(async (req: Request, res: Response) => {
  const coach = await Coach.findById(req.params.id);

  if (!coach) {
    throw ApiError.notFound('Coach not found');
  }

  const file = req.file;

  // If new image uploaded
  if (file) {
    const validation = imageProcessor.validateImage(file);
    if (!validation.valid) {
      throw ApiError.badRequest(validation.error!);
    }

    // Delete old image
    if (coach.image?.filename) {
      await imageProcessor.deleteImage(coach.image.filename, 'coaches');
    }

    // Process new image
    const processedImage = await imageProcessor.processImage(file.buffer, 'coaches');

    req.body.image = {
      url: processedImage.optimized.url,
      thumbnail: processedImage.thumbnail.url,
      alt: req.body.name || coach.name,
      filename: processedImage.filename
    };
  }

  // Update coach
  Object.assign(coach, req.body);
  await coach.save();

  ApiResponse.success(res, { coach }, 'Coach updated successfully');
});

/**
 * @route   DELETE /api/v1/coaches/:id
 * @desc    Delete coach
 * @access  Private (Admin)
 */
export const deleteCoach = asyncHandler(async (req: Request, res: Response) => {
  const coach = await Coach.findById(req.params.id);

  if (!coach) {
    throw ApiError.notFound('Coach not found');
  }

  // Delete image
  if (coach.image?.filename) {
    await imageProcessor.deleteImage(coach.image.filename, 'coaches');
  }

  await coach.deleteOne();

  ApiResponse.success(res, null, 'Coach deleted successfully');
});

/**
 * @route   PATCH /api/v1/coaches/:id/order
 * @desc    Update coach display order
 * @access  Private (Admin)
 */
export const updateCoachOrder = asyncHandler(async (req: Request, res: Response) => {
  const { displayOrder } = req.body;

  const coach = await Coach.findByIdAndUpdate(
    req.params.id,
    { displayOrder },
    { new: true, runValidators: true }
  );

  if (!coach) {
    throw ApiError.notFound('Coach not found');
  }

  ApiResponse.success(res, { coach }, 'Display order updated successfully');
});

/**
 * @route   PATCH /api/v1/coaches/:id/toggle-active
 * @desc    Toggle coach active status
 * @access  Private (Admin)
 */
export const toggleCoachActive = asyncHandler(async (req: Request, res: Response) => {
  const coach = await Coach.findById(req.params.id);

  if (!coach) {
    throw ApiError.notFound('Coach not found');
  }

  coach.isActive = !coach.isActive;
  await coach.save();

  ApiResponse.success(res, { coach }, 'Coach status updated successfully');
});

/**
 * @route   PATCH /api/v1/coaches/:id/toggle-featured
 * @desc    Toggle coach featured status
 * @access  Private (Admin)
 */
export const toggleCoachFeatured = asyncHandler(async (req: Request, res: Response) => {
  const coach = await Coach.findById(req.params.id);

  if (!coach) {
    throw ApiError.notFound('Coach not found');
  }

  coach.isFeatured = !coach.isFeatured;
  await coach.save();

  ApiResponse.success(res, { coach }, 'Coach featured status updated successfully');
});

/**
 * @route   POST /api/v1/coaches/reorder
 * @desc    Bulk update coach display order
 * @access  Private (Admin)
 */
export const reorderCoaches = asyncHandler(async (req: Request, res: Response) => {
  const { coaches } = req.body;

  if (!Array.isArray(coaches) || coaches.length === 0) {
    throw ApiError.badRequest('Coaches array is required');
  }

  const bulkOps = coaches.map((coach: { id: string; displayOrder: number }) => ({
    updateOne: {
      filter: { _id: coach.id },
      update: { displayOrder: coach.displayOrder }
    }
  }));

  await Coach.bulkWrite(bulkOps);

  ApiResponse.success(res, null, 'Coaches reordered successfully');
});
