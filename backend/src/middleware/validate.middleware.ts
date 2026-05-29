import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import ApiError from '../utils/ApiError';

/**
 * Validate request data against Zod schema
 */
export const validate = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      console.log('=== VALIDATION DEBUG ===');
      console.log('Request Body:', JSON.stringify(req.body, null, 2));
      console.log('Request Query:', JSON.stringify(req.query, null, 2));
      console.log('Request Params:', JSON.stringify(req.params, null, 2));
      
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      console.log('Validation passed');
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }));

        console.error('=== VALIDATION ERRORS ===');
        console.error(JSON.stringify(errors, null, 2));
        console.error('=== VALIDATION ERRORS END ===');

        return next(
          ApiError.unprocessableEntity('Validation failed', errors)
        );
      }
      next(error);
    }
  };
};

/**
 * Validate only request body
 */
export const validateBody = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }));

        return next(
          ApiError.unprocessableEntity('Validation failed', errors)
        );
      }
      next(error);
    }
  };
};

/**
 * Validate only query parameters
 */
export const validateQuery = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.query = await schema.parseAsync(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }));

        return next(
          ApiError.unprocessableEntity('Validation failed', errors)
        );
      }
      next(error);
    }
  };
};

/**
 * Validate only route parameters
 */
export const validateParams = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const result = await schema.parseAsync({ params: req.params });
      req.params = result.params;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }));

        return next(
          ApiError.unprocessableEntity('Validation failed', errors)
        );
      }
      next(error);
    }
  };
};
