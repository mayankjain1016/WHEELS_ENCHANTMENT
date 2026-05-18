import { z } from 'zod';

export const createCoachSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Coach name is required'
      })
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name cannot exceed 100 characters')
      .trim(),
    role: z
      .string()
      .max(100, 'Role cannot exceed 100 characters')
      .trim()
      .optional(),
    experience: z
      .string({
        required_error: 'Experience is required'
      })
      .trim(),
    specialty: z
      .string()
      .trim()
      .optional(),
    bio: z
      .string()
      .max(1000, 'Bio cannot exceed 1000 characters')
      .trim()
      .optional(),
    displayOrder: z
      .number()
      .int()
      .min(0)
      .optional()
      .default(0),
    isActive: z
      .boolean()
      .optional()
      .default(true),
    isFeatured: z
      .boolean()
      .optional()
      .default(false),
    socialLinks: z
      .object({
        facebook: z.string().url().optional().or(z.literal('')),
        instagram: z.string().url().optional().or(z.literal(''))
      })
      .optional()
  })
});

export const updateCoachSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name cannot exceed 100 characters')
      .trim()
      .optional(),
    role: z
      .string()
      .max(100, 'Role cannot exceed 100 characters')
      .trim()
      .optional(),
    experience: z
      .string()
      .trim()
      .optional(),
    specialty: z
      .string()
      .trim()
      .optional(),
    bio: z
      .string()
      .max(1000, 'Bio cannot exceed 1000 characters')
      .trim()
      .optional(),
    displayOrder: z
      .number()
      .int()
      .min(0)
      .optional(),
    isActive: z
      .boolean()
      .optional(),
    isFeatured: z
      .boolean()
      .optional(),
    socialLinks: z
      .object({
        facebook: z.string().url().optional().or(z.literal('')),
        instagram: z.string().url().optional().or(z.literal(''))
      })
      .optional()
  })
});

export const coachIdSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: 'Coach ID is required'
      })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid coach ID')
  })
});

export const coachQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
    isActive: z.string().optional(),
    isFeatured: z.string().optional(),
    search: z.string().optional()
  })
});
