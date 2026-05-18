import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import ApiError from '../utils/ApiError';
import asyncHandler from '../utils/asyncHandler';
import User from '../models/User';
import { UserRole } from '../types';
import '../types/index';  // Import to ensure global Express types are registered

interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

/**
 * Authenticate user with JWT token
 */
export const authenticate = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    // Get token from cookie first, then fallback to header
    let token = req.cookies?.accessToken;
    
    // Fallback to Authorization header
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.replace('Bearer ', '');
      }
    }
    
    if (!token) {
      throw ApiError.unauthorized('Authentication token is required');
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

      // Get user from database
      const user = await User.findById(decoded.userId).select('-password -refreshToken');

      if (!user) {
        throw ApiError.unauthorized('User not found');
      }

      if (!user.isActive) {
        throw ApiError.forbidden('Your account has been deactivated');
      }

      // Attach user to request
      req.user = {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      };

      next();
    } catch (error: any) {
      if (error.name === 'JsonWebTokenError') {
        throw ApiError.unauthorized('Invalid token');
      }
      if (error.name === 'TokenExpiredError') {
        throw ApiError.unauthorized('Token expired');
      }
      throw error;
    }
  }
);

/**
 * Authorize user based on roles
 */
export const authorize = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw ApiError.unauthorized('Authentication required');
    }

    if (!roles.includes(req.user.role)) {
      throw ApiError.forbidden('You do not have permission to perform this action');
    }

    next();
  };
};

/**
 * Optional authentication - doesn't throw error if no token
 */
export const optionalAuth = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    // Get token from cookie first, then fallback to header
    let token = req.cookies?.accessToken;
    
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.replace('Bearer ', '');
      }
    }

    if (!token) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
      const user = await User.findById(decoded.userId).select('-password -refreshToken');

      if (user && user.isActive) {
        req.user = {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive
        };
      }
    } catch (error) {
      // Silently fail for optional auth
    }

    next();
  }
);
