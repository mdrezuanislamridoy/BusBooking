// src/app/modules/auth/auth.validation.ts
import { z } from 'zod';

export const loginValidationSchema = z.object({
  id: z.string({ required_error: 'User ID is required' }),
  password: z.string().min(4, { message: 'Password must be at least 4 characters' }),
});