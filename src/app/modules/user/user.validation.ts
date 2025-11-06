import { z } from "zod";

export const userValidationSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
  password: z
    .string()
    .min(4, { message: "Password should be at least 4 characters" })
    .max(20, { message: "Password should not exceed 20 characters" }),
  isPasswordChanged: z.boolean().optional(),
  role: z.enum(['student', 'mentor', 'admin']),
  status: z.enum(['active', 'blocked', 'pending']).optional(),
  isDeleted: z.boolean().optional(),
});
