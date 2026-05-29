import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import ApiError from '../utils/ApiError';
import logger from '../utils/logger';
import { isDevelopment } from '../config/env';

/**
 * Handle Mongoose CastError
 */
const handleCastError = (error: MongooseError.CastError): ApiError => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return ApiError.badRequest(message);
};

/**
 * Handle Mongoose Duplicate Key Error
 */
const handleDuplicateKeyError = (error: any): ApiError => {
  const field = Object.keys(error.keyValue)[0];
  const value = error.keyValue[field];
  const message = `${field} '${value}' already exists`;
  return ApiError.conflict(message);
};

/**
 * Handle Mongoose Validation Error
 */
const handleValidationError = (error: MongooseError.ValidationError): ApiError => {
  const errors = Object.values(error.errors).map((err: any) => ({
    field: err.path,
    message: err.message
  }));
  return ApiError.unprocessableEntity('Validation failed', errors);
};

/**
 * Handle JWT Errors
 */
const handleJWTError = (): ApiError => {
  return ApiError.unauthorized('Invalid token. Please log in again.');
};

const handleJWTExpiredError = (): ApiError => {
  return ApiError.unauthorized('Your token has expired. Please log in again.');
};

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  // Enhanced error logging for debugging
  console.error('=== ERROR HANDLER DEBUG ===');
  console.error('Error Name:', err.name);
  console.error('Error Message:', err.message);
  console.error('Error Code:', err.code);
  console.error('Status Code:', err.statusCode);
  console.error('Request URL:', req.originalUrl);
  console.error('Request Method:', req.method);
  console.error('Request Headers:', JSON.stringify(req.headers, null, 2));
  console.error('Stack:', err.stack);
  console.error('=== ERROR HANDLER DEBUG END ===');

  // Log error
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userId: (req as any).user?._id
  });

  // Mongoose CastError
  if (err.name === 'CastError') {
    error = handleCastError(err);
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    error = handleDuplicateKeyError(err);
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    error = handleValidationError(err);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    error = handleJWTError();
  }

  if (err.name === 'TokenExpiredError') {
    error = handleJWTExpiredError();
  }

  // Default to ApiError or create new one
  if (!(error instanceof ApiError)) {
    error = new ApiError(
      error.statusCode || 500,
      error.message || 'Internal Server Error',
      false
    );
  }

  // Send response
  const response: any = {
    success: false,
    message: error.message || 'Internal Server Error',
    statusCode: error.statusCode || 500
  };

  // Add errors array if exists
  if (error.errors) {
    response.errors = error.errors;
  }

  // Add stack trace in development
  if (isDevelopment && error.stack) {
    response.stack = error.stack;
  }

  res.status(error.statusCode || 500).json(response);
};

/**
 * Handle 404 - Not Found
 */
export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  const error = ApiError.notFound(`Route ${req.originalUrl} not found`);
  next(error);
};
