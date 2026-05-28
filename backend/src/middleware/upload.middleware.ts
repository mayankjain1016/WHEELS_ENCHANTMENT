import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import { env } from '../config/env';
import ApiError from '../utils/ApiError';

// Memory storage for processing with Sharp
const storage = multer.memoryStorage();

/**
 * File filter for images only
 */
const imageFileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        'Invalid file type. Only JPEG, PNG, and WebP images are allowed.'
      ) as any
    );
  }
};

/**
 * Upload single image
 */
export const uploadSingle = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: env.MAX_FILE_SIZE // 10MB default
  }
}).single('image');

/**
 * Upload multiple images (max 10)
 */
export const uploadMultiple = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: env.MAX_FILE_SIZE,
    files: 10
  }
}).array('images', 10);

/**
 * Upload fields with different names
 */
export const uploadFields = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: env.MAX_FILE_SIZE,
    files: 15
  }
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 10 },
  { name: 'logo', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
  { name: 'aadharCard', maxCount: 1 }
]);

/**
 * Handle multer errors
 */
export const handleMulterError = (
  error: any,
  _req: Request,
  _res: any,
  next: any
) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return next(
        ApiError.badRequest(
          `File size exceeds maximum limit of ${env.MAX_FILE_SIZE / (1024 * 1024)}MB`
        )
      );
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return next(ApiError.badRequest('Too many files uploaded'));
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return next(ApiError.badRequest('Unexpected field in file upload'));
    }
    return next(ApiError.badRequest(error.message));
  }
  next(error);
};
