import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to parse FormData fields to proper types
 * Converts string values from FormData to numbers and booleans
 */
export const parseFormData = (req: Request, _res: Response, next: NextFunction) => {
  if (req.body) {
    // Parse numeric fields
    const numericFields = ['price', 'compareAtPrice', 'stock', 'displayOrder', 'age'];
    numericFields.forEach(field => {
      if (req.body[field] !== undefined && req.body[field] !== '') {
        const parsed = parseFloat(req.body[field]);
        req.body[field] = isNaN(parsed) ? undefined : parsed;
      }
    });

    // Parse boolean fields
    const booleanFields = ['isActive', 'isFeatured', 'isBestseller'];
    booleanFields.forEach(field => {
      if (req.body[field] !== undefined) {
        req.body[field] = req.body[field] === 'true' || req.body[field] === true;
      }
    });

    // Remove empty strings
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        delete req.body[key];
      }
    });
  }

  next();
};
