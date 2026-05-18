import { z } from 'zod';

/**
 * MongoDB ObjectId validator
 */
export const objectIdSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: 'ID is required'
      })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format')
  })
});

/**
 * Pagination query validator
 */
export const paginationSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10)),
    sort: z.string().optional().default('-createdAt'),
    select: z.string().optional()
  })
});

/**
 * Search query validator
 */
export const searchSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional()
  })
});

/**
 * Display order update validator
 */
export const updateOrderSchema = z.object({
  body: z.object({
    displayOrder: z
      .number({
        required_error: 'Display order is required'
      })
      .int()
      .min(0, 'Display order cannot be negative')
  })
});

/**
 * Active status toggle validator
 */
export const toggleActiveSchema = z.object({
  body: z.object({
    isActive: z
      .boolean({
        required_error: 'Active status is required'
      })
  })
});

/**
 * Featured status toggle validator
 */
export const toggleFeaturedSchema = z.object({
  body: z.object({
    isFeatured: z
      .boolean({
        required_error: 'Featured status is required'
      })
  })
});

/**
 * Bulk delete validator
 */
export const bulkDeleteSchema = z.object({
  body: z.object({
    ids: z
      .array(
        z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format')
      )
      .min(1, 'At least one ID is required')
      .max(100, 'Cannot delete more than 100 items at once')
  })
});

/**
 * Date range query validator
 */
export const dateRangeSchema = z.object({
  query: z.object({
    fromDate: z.string().datetime().optional(),
    toDate: z.string().datetime().optional()
  })
});
