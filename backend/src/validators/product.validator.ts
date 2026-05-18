import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Product name is required'
      })
      .min(2, 'Name must be at least 2 characters')
      .max(200, 'Name cannot exceed 200 characters')
      .trim(),
    categoryId: z
      .string({
        required_error: 'Category is required'
      })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID'),
    subcategoryId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid subcategory ID')
      .optional(),
    description: z
      .string()
      .max(2000, 'Description cannot exceed 2000 characters')
      .trim()
      .optional(),
    specifications: z
      .string()
      .max(2000, 'Specifications cannot exceed 2000 characters')
      .trim()
      .optional(),
    price: z
      .number()
      .min(0, 'Price cannot be negative')
      .optional(),
    compareAtPrice: z
      .number()
      .min(0, 'Compare price cannot be negative')
      .optional(),
    sku: z
      .string()
      .trim()
      .optional(),
    stock: z
      .number()
      .int()
      .min(0, 'Stock cannot be negative')
      .optional()
      .default(0),
    isFeatured: z
      .boolean()
      .optional()
      .default(false),
    isBestseller: z
      .boolean()
      .optional()
      .default(false),
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
    seo: z
      .object({
        metaTitle: z.string().trim().optional(),
        metaDescription: z.string().trim().optional(),
        keywords: z.array(z.string().trim()).optional()
      })
      .optional()
  })
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(200, 'Name cannot exceed 200 characters')
      .trim()
      .optional(),
    categoryId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID')
      .optional(),
    subcategoryId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid subcategory ID')
      .optional()
      .nullable(),
    description: z
      .string()
      .max(2000, 'Description cannot exceed 2000 characters')
      .trim()
      .optional(),
    specifications: z
      .string()
      .max(2000, 'Specifications cannot exceed 2000 characters')
      .trim()
      .optional(),
    price: z
      .number()
      .min(0, 'Price cannot be negative')
      .optional(),
    compareAtPrice: z
      .number()
      .min(0, 'Compare price cannot be negative')
      .optional()
      .nullable(),
    sku: z
      .string()
      .trim()
      .optional(),
    stock: z
      .number()
      .int()
      .min(0, 'Stock cannot be negative')
      .optional(),
    isFeatured: z
      .boolean()
      .optional(),
    isBestseller: z
      .boolean()
      .optional(),
    displayOrder: z
      .number()
      .int()
      .min(0)
      .optional(),
    isActive: z
      .boolean()
      .optional(),
    seo: z
      .object({
        metaTitle: z.string().trim().optional(),
        metaDescription: z.string().trim().optional(),
        keywords: z.array(z.string().trim()).optional()
      })
      .optional()
  })
});

export const productIdSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: 'Product ID is required'
      })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID')
  })
});

export const productSlugSchema = z.object({
  params: z.object({
    slug: z
      .string({
        required_error: 'Product slug is required'
      })
      .min(1, 'Slug is required')
  })
});

export const productQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
    categoryId: z.string().optional(),
    subcategoryId: z.string().optional(),
    isActive: z.string().optional(),
    isFeatured: z.string().optional(),
    isBestseller: z.string().optional(),
    search: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional()
  })
});
