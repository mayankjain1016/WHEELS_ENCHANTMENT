import { z } from 'zod';

export const createGallerySchema = z.object({
  body: z.object({
    title: z
      .string()
      .max(200, 'Title cannot exceed 200 characters')
      .trim()
      .optional(),
    caption: z
      .string()
      .max(500, 'Caption cannot exceed 500 characters')
      .trim()
      .optional(),
    category: z
      .enum(['Training', 'Competition', 'Events', 'Facilities', 'Students', 'Other'], {
        required_error: 'Category is required'
      }),
    tags: z
      .array(z.string().trim().toLowerCase())
      .optional()
      .default([]),
    displayOrder: z
      .number()
      .int()
      .min(0)
      .optional()
      .default(0),
    isActive: z
      .boolean()
      .optional()
      .default(true)
  })
});

export const updateGallerySchema = z.object({
  body: z.object({
    title: z
      .string()
      .max(200, 'Title cannot exceed 200 characters')
      .trim()
      .optional(),
    caption: z
      .string()
      .max(500, 'Caption cannot exceed 500 characters')
      .trim()
      .optional(),
    category: z
      .enum(['Training', 'Competition', 'Events', 'Facilities', 'Students', 'Other'])
      .optional(),
    tags: z
      .array(z.string().trim().toLowerCase())
      .optional(),
    displayOrder: z
      .number()
      .int()
      .min(0)
      .optional(),
    isActive: z
      .boolean()
      .optional()
  })
});

export const galleryIdSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: 'Gallery ID is required'
      })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid gallery ID')
  })
});

export const galleryQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
    category: z.string().optional(),
    tags: z.string().optional(),
    isActive: z.string().optional(),
    search: z.string().optional()
  })
});
