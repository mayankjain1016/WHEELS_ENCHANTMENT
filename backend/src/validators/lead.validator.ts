import { z } from 'zod';

export const createLeadSchema = z.object({
  body: z.object({
    studentName: z
      .string({
        required_error: 'Student name is required'
      })
      .min(2, 'Name must be at least 2 characters')
      .trim(),
    dateOfBirth: z
      .string({ required_error: 'Date of birth is required' })
      .min(1, 'Date of birth is required'),
    school: z
      .string({ required_error: 'School name is required' })
      .min(1, 'School name is required'),
    fatherName: z
      .string({ required_error: 'Father name is required' })
      .min(1, 'Father name is required'),
    fatherMobile: z
      .string({ required_error: 'Father mobile number is required' })
      .regex(/^[0-9]{10}$/, 'Invalid phone number'),
    motherName: z
      .string({ required_error: 'Mother name is required' })
      .min(1, 'Mother name is required'),
    motherMobile: z
      .string({ required_error: 'Mother mobile number is required' })
      .regex(/^[0-9]{10}$/, 'Invalid phone number'),
    address: z
      .string({ required_error: 'Address is required' })
      .min(1, 'Address is required'),
    email: z
      .string({
        required_error: 'Email is required'
      })
      .email('Invalid email')
      .trim(),
    age: z
      .number()
      .int()
      .min(3)
      .max(100)
      .optional(),
    location: z
      .string()
      .optional(),
    preferredLocation: z
      .string()
      .optional(),
    experienceLevel: z
      .enum(['Beginner', 'Intermediate', 'Advanced'])
      .optional()
      .default('Beginner'),
    message: z
      .string()
      .optional(),
    source: z
      .enum(['Website', 'Referral', 'School'])
      .optional()
      .default('Website')
  })
});

export const updateLeadSchema = z.object({
  body: z.object({
    studentName: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name cannot exceed 100 characters')
      .trim()
      .optional(),
    parentName: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name cannot exceed 100 characters')
      .trim()
      .optional(),
    email: z
      .string()
      .email('Invalid email address')
      .toLowerCase()
      .trim()
      .optional(),
    phone: z
      .string()
      .regex(/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number')
      .trim()
      .optional(),
    age: z
      .number()
      .int()
      .min(3, 'Age must be at least 3')
      .max(100, 'Age cannot exceed 100')
      .optional(),
    location: z
      .string()
      .trim()
      .optional(),
    preferredLocation: z
      .string()
      .trim()
      .optional(),
    experienceLevel: z
      .enum(['Beginner', 'Intermediate', 'Advanced'])
      .optional(),
    message: z
      .string()
      .max(1000, 'Message cannot exceed 1000 characters')
      .trim()
      .optional(),
    status: z
      .enum(['New', 'Contacted', 'Enrolled', 'Rejected'])
      .optional(),
    source: z
      .enum(['Website', 'Referral', 'School'])
      .optional(),
    followUpDate: z
      .string()
      .datetime()
      .optional()
  })
});

export const updateLeadStatusSchema = z.object({
  body: z.object({
    status: z
      .enum(['New', 'Contacted', 'Enrolled', 'Rejected'], {
        required_error: 'Status is required'
      })
  })
});

export const assignLeadSchema = z.object({
  body: z.object({
    assignedTo: z
      .string({
        required_error: 'User ID is required'
      })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID')
  })
});

export const addNoteSchema = z.object({
  body: z.object({
    text: z
      .string({
        required_error: 'Note text is required'
      })
      .min(1, 'Note cannot be empty')
      .max(1000, 'Note cannot exceed 1000 characters')
      .trim()
  })
});

export const leadIdSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: 'Lead ID is required'
      })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid lead ID')
  })
});

export const leadQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
    status: z.string().optional(),
    source: z.string().optional(),
    experienceLevel: z.string().optional(),
    assignedTo: z.string().optional(),
    search: z.string().optional(),
    fromDate: z.string().optional(),
    toDate: z.string().optional()
  })
});
