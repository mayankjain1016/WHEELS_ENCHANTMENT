import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required'
      })
      .email('Invalid email address')
      .toLowerCase()
      .trim(),
    password: z
      .string({
        required_error: 'Password is required'
      })
      .min(8, 'Password must be at least 8 characters')
  })
});

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required'
      })
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .trim(),
    email: z
      .string({
        required_error: 'Email is required'
      })
      .email('Invalid email address')
      .toLowerCase()
      .trim(),
    password: z
      .string({
        required_error: 'Password is required'
      })
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    role: z
      .enum(['admin', 'super_admin'])
      .optional()
      .default('admin')
  })
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z
      .string({
        required_error: 'Current password is required'
      })
      .min(1, 'Current password is required'),
    newPassword: z
      .string({
        required_error: 'New password is required'
      })
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      )
  })
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z
      .string({
        required_error: 'Refresh token is required'
      })
      .min(1, 'Refresh token is required')
  })
});
