import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';
import Review from '../models/Review';
import { paginate, getPaginationParams } from '../utils/pagination';

export const createReview = asyncHandler(async (req: Request, res: Response) => {
  const review = await Review.create(req.body);
  ApiResponse.created(res, { review }, 'Review submitted successfully. It will be visible after approval.');
});

export const getReviews = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, sort } = getPaginationParams(req.query);
  const { isApproved, isActive } = req.query;

  const filter: any = {};
  if (isApproved !== undefined) filter.isApproved = isApproved === 'true';
  if (isActive !== undefined) filter.isActive = isActive === 'true';

  const query = Review.find(filter);
  const result = await paginate(query, { page, limit, sort: sort || '-createdAt' });

  ApiResponse.paginated(res, result.data, result.pagination.page, result.pagination.limit, result.pagination.total, 'Reviews retrieved successfully');
});

export const getApprovedReviews = asyncHandler(async (_req: Request, res: Response) => {
  const reviews = await Review.find({ isApproved: true, isActive: true }).sort('displayOrder -createdAt');
  ApiResponse.success(res, { reviews }, 'Approved reviews retrieved successfully');
});

export const getReviewById = asyncHandler(async (req: Request, res: Response) => {
  const review = await Review.findById(req.params.id);
  if (!review) throw ApiError.notFound('Review not found');
  ApiResponse.success(res, { review }, 'Review retrieved successfully');
});

export const updateReview = asyncHandler(async (req: Request, res: Response) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!review) throw ApiError.notFound('Review not found');
  ApiResponse.success(res, { review }, 'Review updated successfully');
});

export const approveReview = asyncHandler(async (req: Request, res: Response) => {
  const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
  if (!review) throw ApiError.notFound('Review not found');
  ApiResponse.success(res, { review }, 'Review approved successfully');
});

export const deleteReview = asyncHandler(async (req: Request, res: Response) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) throw ApiError.notFound('Review not found');
  ApiResponse.success(res, null, 'Review deleted successfully');
});
